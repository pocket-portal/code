#include<ESP8266WiFi.h>

void setup() { pinMode(LED_BUILTIN,OUTPUT);
WiFi.mode(WIFI_AP);WiFi.softAP("Pocket Portal Power Play"); // ✨ set your network name here ✨
}

void loop() { digitalWrite(LED_BUILTIN,HIGH);delay(1000);digitalWrite(LED_BUILTIN, LOW);delay(1000);
}
