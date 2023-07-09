#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// UBC visitor WiFi
// const char* ssid = "ubcvisitor";  // Wifi name
// const char* password = "";        // Wifi password

// My Hotpspot
// const char* ssid = "Hasan's iPhone";  // Wifi name
// const char* password = "Hasan_2002";        // Wifi password

// Home WiFi
const char* ssid = "TELUS1902";  // Wifi name
const char* password = "kZK5EXhQJFtr";        // Wifi password

// Setup code (only runs once)
void setup() {  

  Serial.begin(115200);

  WiFi.begin(ssid, password); // Begin connecting to WiFi

  while (WiFi.status() != WL_CONNECTED) {  // Wait until connection is successful
    delay(500);
    Serial.println("Waiting for connection");
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) { // Checks WiFi is still connected
    WiFiClient client;
    HTTPClient http;
 
    http.begin(client, "http://206.12.161.3:8080/image");      // Request destination
    http.addHeader("Content-Type", "text/plain");  // Content-type header
 
    int httpCode = http.POST("Can we communicate?");   //Send the request

    if (httpCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpCode);
      }
 
    http.end();  //Close connection
 
  } else {
 
    Serial.println("Error in WiFi connection");
 
  }
 
  delay(30000);
}