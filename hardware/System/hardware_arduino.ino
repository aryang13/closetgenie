#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>

// UBC visitor WiFi
// const char* ssid = "ubcvisitor";  // Wifi name
// const char* password = "";        // Wifi password

// My Hotpspot
// const char* ssid = "Hasan's iPhone";  // Wifi name
// const char* password = "Hasan_2002";        // Wifi password

// Home WiFi
const char* ssid = "TELUS1902";  // Wifi name
const char* password = "kZK5EXhQJFtr";        // Wifi password

// Demo WiFi
const char* ssid = "CPEN391";  // Wifi name
const char* password = "57055954";        // Wifi password

// Replace with your server's address
const char* serverAddress = "http://206.12.161.3:8080/gps";

// Create a software serial interface for the GPS module
SoftwareSerial gpsSerial(10, 11);

void setup() {
  // Start the primary serial interface
  Serial.begin(9600);

  // Start the software serial interface for the GPS module
  gpsSerial.begin(9600);

  // Configure the ESP8266 module's baud rate to 115200
  Serial.println("Configuring ESP8266 module...");
  delay(1000);
  Serial.begin(115200);
  delay(1000);

  // Connect to Wi-Fi network
  Serial.println();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Waiting for connection");
  }
  Serial.println("WiFi connected");
}

void loop() {
  // Read data from the GPS module
  String gpsData = "";
  while (gpsSerial.available()) {
    gpsData += (char) gpsSerial.read();
  }

  // Extract the latitude and longitude from the GPS data
  String latitude = "";
  String longitude = "";
  if (gpsData.startsWith("$GPGGA")) {
    int commaIndex = gpsData.indexOf(',');
    for (int i = 0; i < 2; i++) {
      commaIndex = gpsData.indexOf(',', commaIndex + 1);
    }
    int decimalIndex = gpsData.indexOf('.', commaIndex);
    latitude = gpsData.substring(commaIndex - 2, decimalIndex + 6);
    commaIndex = gpsData.indexOf(',', decimalIndex);
    decimalIndex = gpsData.indexOf('.', commaIndex);
    longitude = gpsData.substring(commaIndex - 3, decimalIndex + 6);
  }

  // Construct the post request with the latitude and longitude
  String postData = "latitude=" + latitude + "&longitude=" + longitude;
  String postRequest = "POST /post.php HTTP/1.1\r\n";
  postRequest += "Host: " + String(serverAddress) + "\r\n";
  postRequest += "Content-Type: application/x-www-form-urlencoded\r\n";
  postRequest += "Content-Length: " + String(postData.length()) + "\r\n\r\n";
  postRequest += postData;

  // Send the post request to the server
  WiFiClient client;
  if (client.connect(serverAddress, 80)) {
    Serial.println("Sending post request...");
    client.print(postRequest);
    delay(1000);
    // while (client.available()) {
    //   char c = client.read();
    //   Serial.write(c);
    // }
    Serial.println();
    client.stop();
  } else {
    Serial.println("Connection failed");
  }

  // Wait for 10 seconds before sending the next post request
  delay(10000);
}
