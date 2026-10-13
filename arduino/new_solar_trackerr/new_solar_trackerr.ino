#include <Wire.h>
#include <Servo.h>
#include <Adafruit_INA219.h>

Servo solarServo;
Adafruit_INA219 ina219;


// ===============================
// PINS
// ===============================

const int LDR1 = A0;
const int LDR2 = A1;
const int servoPin = 4;


// ===============================
// SERVO CALIBRATION
// ===============================

// Actual physical servo position
// when panel is straight/up.
const int CENTER_POSITION = 100;

const int MIN_SERVO = 0;
const int MAX_SERVO = 180;


// ===============================
// TRACKING SETTINGS
// ===============================

int tolerance = 40;
int STEP_SIZE = 2;

int servoPosition = CENTER_POSITION;

bool autoMode = true;


// ===============================
// SERIAL COMMAND BUFFER
// ===============================

String commandBuffer = "";


// ===============================
// CALIBRATED RAW ANGLE
// ===============================

int getCalibratedRaw(int servo) {

  int calibratedRaw =
    servo - CENTER_POSITION + 90;

  return constrain(
    calibratedRaw,
    0,
    180
  );
}


// ===============================
// PANEL ANGLE
// ===============================
//
// Straight/up = 0°
//
// Right = positive
// Left  = negative
//
// +90° = right
// -90° = left
//

int getPanelAngle(int servo) {

  int panelAngle;

  if (servo <= CENTER_POSITION) {

    panelAngle =
      (CENTER_POSITION - servo) *
      90.0 /
      CENTER_POSITION;

  }
  else {

    panelAngle =
      -((servo - CENTER_POSITION) *
        90.0 /
        (MAX_SERVO - CENTER_POSITION));
  }

  return constrain(
    panelAngle,
    -90,
    90
  );
}


// ===============================
// CONVERT PANEL ANGLE
// TO SERVO POSITION
// ===============================

int panelAngleToServo(int angle) {

  angle = constrain(angle, -90, 90);

  int servo;

  if (angle >= 0) {

    // Right side
    // 0°   → servo 100
    // +90° → servo 0

    servo =
      CENTER_POSITION -
      (angle * CENTER_POSITION / 90.0);

  }
  else {

    // Left side
    // 0°    → servo 100
    // -90°  → servo 180

    servo =
      CENTER_POSITION +
      ((-angle) *
       (MAX_SERVO - CENTER_POSITION) /
       90.0);
  }

  return constrain(
    servo,
    MIN_SERVO,
    MAX_SERVO
  );
}


// ===============================
// PROCESS DASHBOARD COMMANDS
// ===============================

void processCommand(String command) {

  command.trim();


  // -------------------------------
  // AUTO MODE
  // -------------------------------

  if (command == "MODE:AUTO") {

    autoMode = true;
    return;
  }


  // -------------------------------
  // MANUAL MODE
  // -------------------------------

  if (command == "MODE:MANUAL") {

    autoMode = false;
    return;
  }


  // -------------------------------
  // MANUAL ANGLE
  // -------------------------------

  if (command.startsWith("ANGLE:")) {

    int angle =
      command.substring(6).toInt();

    servoPosition =
      panelAngleToServo(angle);

    solarServo.write(
      servoPosition
    );

    return;
  }


  // -------------------------------
  // TOLERANCE
  // -------------------------------

  if (command.startsWith("TOL:")) {

    int value =
      command.substring(4).toInt();

    tolerance =
      constrain(value, 5, 200);

    return;
  }


  // -------------------------------
  // TRACKING SPEED
  // -------------------------------

  if (command.startsWith("STEP:")) {

    int value =
      command.substring(5).toInt();

    STEP_SIZE =
      constrain(value, 1, 10);

    return;
  }


  // -------------------------------
  // RESET CENTER
  // -------------------------------

  if (command == "CENTER") {

    servoPosition =
      CENTER_POSITION;

    solarServo.write(
      servoPosition
    );

    return;
  }
}


// ===============================
// READ SERIAL COMMANDS
// ===============================

void readCommands() {

  while (Serial.available()) {

    char c =
      Serial.read();

    if (c == '\n') {

      processCommand(
        commandBuffer
      );

      commandBuffer = "";
    }

    else if (c != '\r') {

      commandBuffer += c;
    }
  }
}


// ===============================
// READ INA219 POWER DATA
// ===============================

void readPowerData(
  float &voltage,
  float &current_mA,
  float &power_W
) {

  // Read bus voltage
  voltage =
    ina219.getBusVoltage_V();


  // Read current in mA
  current_mA =
    ina219.getCurrent_mA();


  // --------------------------------
  // REMOVE ONLY TINY NEGATIVE NOISE
  // --------------------------------
  //
  // Your panel is very small and can
  // produce less than 1 mA under weak
  // illumination.
  //
  // Therefore we use a very small
  // dead zone instead of 2 mA.
  //

  if (current_mA < 0.0 &&
      current_mA > -0.2) {

    current_mA = 0.0;
  }


  // --------------------------------
  // CALCULATE POWER OURSELVES
  // --------------------------------
  //
  // mA → A
  //

  float current_A =
    current_mA / 1000.0;


  power_W =
    voltage * current_A;


  // --------------------------------
  // DON'T DISPLAY NEGATIVE POWER
  // --------------------------------

  if (power_W < 0.0) {

    power_W = 0.0;
  }
}


// ===============================
// SETUP
// ===============================

void setup() {

  // -------------------------------
  // SERIAL
  // -------------------------------

  Serial.begin(9600);


  // -------------------------------
  // SERVO
  // -------------------------------

  solarServo.attach(
    servoPin
  );

  servoPosition =
    CENTER_POSITION;

  solarServo.write(
    servoPosition
  );


  // -------------------------------
  // INA219
  // -------------------------------

  if (!ina219.begin()) {

    Serial.println(
      "ERROR: INA219 NOT DETECTED"
    );

    // Stop program if sensor
    // is not found.
    while (1) {

      delay(1000);
    }
  }


  Serial.println(
    "INA219 DETECTED"
  );


  delay(500);
}


// ===============================
// MAIN LOOP
// ===============================

void loop() {

  // ===============================
  // CHECK DASHBOARD COMMANDS
  // ===============================

  readCommands();


  // ===============================
  // READ LDRs
  // ===============================

  int lightLeft =
    analogRead(LDR1);

  int lightRight =
    analogRead(LDR2);


  int difference =
    lightLeft - lightRight;


  // ===============================
  // AUTOMATIC TRACKING
  // ===============================

  if (autoMode) {

    if (abs(difference) > tolerance) {

      if (lightLeft > lightRight) {

        servoPosition -= STEP_SIZE;
      }

      else if (lightRight > lightLeft) {

        servoPosition += STEP_SIZE;
      }
    }
  }


  // ===============================
  // SERVO LIMITS
  // ===============================

  servoPosition =
    constrain(
      servoPosition,
      MIN_SERVO,
      MAX_SERVO
    );


  // ===============================
  // MOVE SERVO
  // ===============================

  solarServo.write(
    servoPosition
  );


  // ===============================
  // CALCULATE ANGLES
  // ===============================

  int rawAngle =
    getCalibratedRaw(
      servoPosition
    );

  int panelAngle =
    getPanelAngle(
      servoPosition
    );


  // ===============================
  // READ INA219
  // ===============================

  float voltage = 0.0;
  float current_mA = 0.0;
  float power_W = 0.0;


  readPowerData(
    voltage,
    current_mA,
    power_W
  );


  // ===============================
  // SEND DATA
  // ===============================

  Serial.print("LDR1:");
  Serial.print(lightLeft);

  Serial.print(",LDR2:");
  Serial.print(lightRight);

  Serial.print(",RAW:");
  Serial.print(rawAngle);

  Serial.print(",PANEL:");
  Serial.print(panelAngle);

  Serial.print(",MODE:");

  if (autoMode) {
    Serial.print("AUTO");
  }
  else {
    Serial.print("MANUAL");
  }

  Serial.print(",VOLTAGE:");
  Serial.print(voltage, 3);

  Serial.print(",CURRENT:");
  Serial.print(current_mA, 3);

  Serial.print(",POWER:");
  Serial.println(power_W, 6);


  // ===============================
  // LOOP DELAY
  // ===============================

  delay(50);
}