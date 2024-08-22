#include <HX711_ADC.h>
#include <EEPROM.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// WiFi and MQTT settings
const char* ssid = "Air Sofia B";             // WiFi SSID
const char* password = "airsofia2024";        // WiFi Password
const char* mqtt_server = "192.168.0.222";    // MQTT Broker address (revised)
const char* mqtt_topic = "Trailer1/sensors";  // MQTT Topic

const char* node_id = "scale1";               // Unique ID for this node

WiFiClient espClient;
PubSubClient client(espClient);

const int HX711_dout = 14;
const int HX711_sck = 2;

HX711_ADC LoadCell(HX711_dout, HX711_sck);

const int calVal_eepromAdress = 0;
unsigned long previousReadMillis = 0;
unsigned long previousSendMillis = 0;
const long read_interval = 10000;  // 10 seconds
const long send_interval = 600000; // 10 minutes

float currentWeight = 0; // Variable to store the most recent weight measurement

const int buttonPin = 0; // GPIO 0 (D3) Calibration button

void setup_wifi() {
    delay(10);
    WiFi.begin(ssid, password);
    Serial.println("Connecting to WiFi");
    int timeout = 0;
    while (WiFi.status() != WL_CONNECTED && timeout < 30) {  // Retry for 15 seconds
        delay(500);
        Serial.print(".");
        timeout++;
    }
    Serial.println();

    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi connection failed, restarting...");
        ESP.restart();  // Restart the ESP if WiFi connection fails
    } else {
        Serial.println("Connected to WiFi");
    }
}

void reconnect() {
    int retryCount = 0;
    while (!client.connected() && retryCount < 10) {  // Limit retries to 10
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
        ESP.restart();  // Restart after 10 failed attempts
    }
}

void setup() {
    Serial.begin(57600);
    pinMode(buttonPin, INPUT_PULLUP);
    setup_wifi();
    client.setServer(mqtt_server, 1883);

    EEPROM.begin(512);

    LoadCell.begin();
    unsigned long stabilizingtime = 2000;
    boolean _tare = true;
    LoadCell.start(stabilizingtime, _tare);

    if (LoadCell.getTareTimeoutFlag() || LoadCell.getSignalTimeoutFlag()) {
        Serial.println("HX711 start failed, entering infinite loop");
        while (1);
    }

    // Load calibration value from EEPROM
    float calValue;
    EEPROM.get(calVal_eepromAdress, calValue);
    LoadCell.setCalFactor(calValue);
    Serial.println("Calibration factor set");

    while (!LoadCell.update());
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

    // Update weight every 10 seconds
    if (currentMillis - previousReadMillis >= read_interval) {
        previousReadMillis = currentMillis;
        updateWeight();
    }

    // Send data every 10 minutes
    if (currentMillis - previousSendMillis >= send_interval) {
        previousSendMillis = currentMillis;
        sendData();
    }

    if (digitalRead(buttonPin) == LOW) {
        Serial.println("Calibration button pressed");
        calibrate();
        delay(1000);  // Basic debounce delay
    }
}

void updateWeight() {
    if (LoadCell.update()) {
        currentWeight = LoadCell.getData();
        Serial.print("Updated weight: ");
        Serial.println(currentWeight);
    }
}

void sendData() {
    // Create JSON formatted payload with node_id and measurement
    String payload = "{\"" + String(node_id) + "\":" + String(currentWeight) + "}";
    Serial.print("Publishing weight: ");
    Serial.println(payload);

    client.publish(mqtt_topic, payload.c_str());
}

void calibrate() {
    Serial.println("Starting calibration...");
    LoadCell.tare();
    delay(5000); // Wait for tare to stabilize
    LoadCell.refreshDataSet();
    Serial.println("Put known weight on scale");

    float known_mass = 500.0;  // Set to your known mass in grams
    float newCalibrationValue = LoadCell.getNewCalibration(known_mass);

    EEPROM.put(calVal_eepromAdress, newCalibrationValue);
    EEPROM.commit();

    // Apply the new calibration value
    LoadCell.setCalFactor(newCalibrationValue);
    Serial.print("New calibration factor set: ");
    Serial.println(newCalibrationValue);
}
