#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// WiFi and MQTT settings
const char* ssid = "YOUR_WIFI_SSID";          // WiFi SSID — set before flashing
const char* password = "YOUR_WIFI_PASSWORD";  // WiFi Password — set before flashing
const char* mqtt_server = "192.168.0.222";    // MQTT Broker address
const char* mqtt_topic = "Trailer1/sensors";  // MQTT Topic

WiFiClient espClient;
PubSubClient client(espClient);

// DHT11 sensor pins
#define DHTPIN1 4  // D2
#define DHTPIN2 5  // D1
#define DHTPIN3 14 // D5

#define DHTTYPE DHT11 // DHT 11

DHT dht1(DHTPIN1, DHTTYPE);
DHT dht2(DHTPIN2, DHTTYPE);
DHT dht3(DHTPIN3, DHTTYPE);

unsigned long previousSendMillis = 0;
const long send_interval = 600000; // 10 minutes

void setup_wifi() {
    delay(10);
    WiFi.begin(ssid, password);
    Serial.println("Connecting to WiFi");
    int timeout = 0;
    while (WiFi.status() != WL_CONNECTED && timeout < 30) { // Retry for 15 seconds
        delay(500);
        Serial.print(".");
        timeout++;
    }
    Serial.println();

    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi connection failed, restarting...");
        ESP.restart(); // Restart the ESP if WiFi connection fails
    } else {
        Serial.println("Connected to WiFi");
    }
}

void reconnect() {
    int retryCount = 0;
    while (!client.connected() && retryCount < 10) { // Limit retries to 10
        if (client.connect("ESP8266Client")) {
            Serial.println("Connected to MQTT server");
        } else {
            Serial.print("Failed to connect to MQTT, state: ");
            Serial.println(client.state());
            Serial.print("Retrying in 5 seconds... (");
            Serial.print(retryCount + 1);
            Serial.println("/10)");
            retryCount++;
            delay(5000);
        }
    }
    if (retryCount >= 10) {
        Serial.println("Failed to connect to MQTT after 10 attempts, restarting...");
        ESP.restart(); // Restart after 10 failed attempts
    }
}

void setup() {
    Serial.begin(57600);
    setup_wifi();
    client.setServer(mqtt_server, 1883);

    dht1.begin();
    dht2.begin();
    dht3.begin();
}

void loop() {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi disconnected, reconnecting...");
        setup_wifi();
    }

    if (!client.connected()) {
        Serial.println("MQTT disconnected, reconnecting...");
        reconnect();
    }
    client.loop();

    unsigned long currentMillis = millis();

    // Send data every 10 minutes
    if (currentMillis - previousSendMillis >= send_interval) {
        previousSendMillis = currentMillis;
        sendData();
    }
}

void sendData() {
    // Read data from the first DHT11 sensor
    float temp1 = dht1.readTemperature();
    float hum1 = dht1.readHumidity();

    // Read data from the second DHT11 sensor
    float temp2 = dht2.readTemperature();
    float hum2 = dht2.readHumidity();

    // Read data from the third DHT11 sensor
    float temp3 = dht3.readTemperature();
    float hum3 = dht3.readHumidity();

    // Replace NaN with 0 if a sensor fails
    temp1 = isnan(temp1) ? 0 : temp1;
    hum1 = isnan(hum1) ? 0 : hum1;
    temp2 = isnan(temp2) ? 0 : temp2;
    hum2 = isnan(hum2) ? 0 : hum2;
    temp3 = isnan(temp3) ? 0 : temp3;
    hum3 = isnan(hum3) ? 0 : hum3;

    // Create a JSON object with sensor data
    StaticJsonDocument<256> doc;
    doc["temp1"] = temp1;
    doc["hum1"] = hum1;
    doc["temp2"] = temp2;
    doc["hum2"] = hum2;
    doc["temp3"] = temp3;
    doc["hum3"] = hum3;

    // Serialize JSON object to string
    char payload[256];
    serializeJson(doc, payload);

    Serial.print("Publishing sensor data: ");
    Serial.println(payload);

    // Publish JSON data to the MQTT topic
    client.publish(mqtt_topic, payload);
}
