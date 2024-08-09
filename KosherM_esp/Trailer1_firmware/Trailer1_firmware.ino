#include <HX711_ADC.h>
#include <EEPROM.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// WiFi and MQTT settings
const char* ssid = "your_SSID";             // WiFi SSID
const char* password = "your_PASSWORD";     // WiFi Password
const char* mqtt_server = "your_MQTT_SERVER"; // MQTT Broker address
const char* mqtt_topic = "Trailer1/sensors";  // MQTT Topic

const char* node_id = "scale1"; //Unique ID for this node (i.e. scale1, scale2, scale3...)

WiFiClient espClient;
PubSubClient client(espClient);

const int HX711_dout = 14;
const int HX711_sck = 2;

HX711_ADC LoadCell(HX711_dout, HX711_sck);

const int calVal_eepromAdress = 0;
unsigned long previousMillis = 0; 
const long interval = 3600000;  // 1 hour in ms

const int buttonPin = 0;  // GPIO 0 (D3) Calibration button

void setup_wifi() {
  delay(10);
  WiFi.begin(ssid, password);

  int timeout = 0;
  while (WiFi.status() != WL_CONNECTED && timeout < 30) {
    delay(500);
    timeout++;
  }

  if (WiFi.status() != WL_CONNECTED) {
    ESP.restart();  // Restart the ESP if WiFi connection fails
  }
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP8266Client")) {
      // MQTT connection established, no subscription logic
    } 
    else {
      delay(5000);
    }
  }
}

void setup() {
  pinMode(buttonPin, INPUT_PULLUP); 
  setup_wifi();
  client.setServer(mqtt_server, 1883);

  EEPROM.begin(512);
  
  LoadCell.begin();
  unsigned long stabilizingtime = 2000;
  boolean _tare = true;
  LoadCell.start(stabilizingtime, _tare);

  if (LoadCell.getTareTimeoutFlag() || LoadCell.getSignalTimeoutFlag()) {
    while (1);  
  }

  // Load calibration value from EEPROM
  float calValue;
  EEPROM.get(calVal_eepromAdress, calValue);
  LoadCell.setCalFactor(calValue);

  while (!LoadCell.update());
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    setup_wifi();
  }
  
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long currentMillis = millis();
  
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    takeMeasurement();
  }

  if (digitalRead(buttonPin) == LOW) {
    calibrate();
    delay(1000);  // Debounce delay
  }
}

void takeMeasurement() {
  if (LoadCell.update()) {
    float weight = LoadCell.getData();
    
    // Create JSON formatted payload with node_id and measurement
    String payload = "{\"" + String(node_id) + "\":" + String(weight) + "}";

    client.publish(mqtt_topic, payload.c_str());
  }
}


void calibrate() {
  LoadCell.tare(); 
  delay(2000); // Wait for tare to stabilize
  LoadCell.refreshDataSet();
  
  float known_mass = 233.0;
  float newCalibrationValue = LoadCell.getNewCalibration(known_mass);
  
  EEPROM.put(calVal_eepromAdress, newCalibrationValue);
  EEPROM.commit();
  
  // Apply the new calibration value
  LoadCell.setCalFactor(newCalibrationValue);
}
