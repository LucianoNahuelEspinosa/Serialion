
# Serialion

## Application
[Windows](https://drive.google.com/file/d/1PqXHqV4EcdluJymDJ6BMqm3Wh4wnIhwu/view?usp=drive_link)

## Arduino setup - Example code

    #include <CapacitiveSensor.h>
    #include <NewPing.h>
    
    const int maxCM = 4000;
    NewPing sonar(6, 5, maxCM); //(triggerPin, EchoPin, maxCM)
    int dist;
    
    CapacitiveSensor touch = CapacitiveSensor(4, 3);
    
    void setup() {
      touch.set_CS_AutocaL_Millis(0xFFFFFFFF);
      Serial.begin(9600);
    }
    
    void loop() {
      delay(200);
      
      long touchValue = touch.capacitiveSensor(30);
      dist = sonar.ping_cm();
      
      // This is how to set the serial data for app
      Serial.print("Distance: ");
      Serial.print(dist);
      Serial.print(",");
    
      Serial.print("Touch: ");
      Serial.print(touchValue);
      Serial.print(",");
    
      Serial.println();
    }

## Development setup

Install dependencies:

    npm install
    npm run rebuild

Start dev mode:

    npm start

> If you want run dev mode, should add __ on "config" name on packege.json. Remember remove these __ before build the app
> In case It isn't working when you run, try to build the app and try again to start dev mode

Build the application:

    npm run make

## Support

Don't hesitate to send me an email for any questions you may have. My email: nachuespinosa@gmail.com