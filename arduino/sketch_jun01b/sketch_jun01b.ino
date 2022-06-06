int pirPin = 2;
int buttonPin = 3;
int pirStat = 0;
int buttonStat = 0;

void setup() { 
  pinMode(pirPin, INPUT); 
  pinMode(buttonPin, INPUT);
 
  Serial.begin(9600);
}

void loop(){

  pirStat = digitalRead(pirPin);
  buttonStat = digitalRead(buttonPin);

  if(buttonStat == HIGH){// if button detected
    Serial.println("B");
  }
  else if (pirStat == HIGH) {// if motion detected
    Serial.println("M");
  }
  delay(500); //wait for .5 sec
}
