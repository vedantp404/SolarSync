# SolarSync

## Dual-LDR Based Automatic Solar Tracking System With Real-Time Web Dashboard

SolarSync is a **single-axis automatic solar tracking system** that uses two LDR sensors to detect differences in light intensity, an Arduino UNO to control the tracking logic, an SG90 servo motor for panel movement, an INA219 module for voltage/current/power monitoring, and a Flask-based web dashboard for real-time monitoring and control.

---

# 1. PROJECT OVERVIEW

The system works in four main stages:

1. **Sense** sunlight using two LDR sensors.
2. **Track** the stronger light direction using an SG90 servo.
3. **Measure** solar electrical output using the INA219.
4. **Visualize** live data through a Flask web dashboard.

### Complete System Flow

```text
             SUNLIGHT
                 ↓
          ┌─────────────┐
          │ Solar Panel │
          └──────┬──────┘
                 │
              INA219
          Voltage / Current
              / Power
                 │
                 ↓
                LOAD


       LDR 1 ───────────┐
                        │
                        ↓
                  ARDUINO UNO
                        ↑
                        │
       LDR 2 ───────────┘
                        │
                        ↓
                   SG90 SERVO
                        │
                        ↓
                 PANEL MOVEMENT


Arduino UNO
     │
     │ USB Serial
     ↓
   PySerial
     ↓
Flask Backend
     ↓
Flask-SocketIO
     ↓
JavaScript Frontend
     ↓
Web Dashboard
```

---

# 2. HARDWARE

The project uses:

- Arduino UNO
- 2 × LDR sensors
- 2 × 10kΩ resistors
- SG90 servo motor
- 6V 100mA solar panel
- INA219 power monitoring module
- LED / load

---

# 3. HARDWARE CONNECTIONS

## Arduino UNO Connections

| Component | Arduino UNO |
|---|---|
| LDR 1 | A0 |
| LDR 2 | A1 |
| Servo Signal | D4 |
| INA219 SDA | A4 |
| INA219 SCL | A5 |
| INA219 VCC | 5V |
| INA219 GND | GND |

---

## LDR Connections

Each LDR is connected as a voltage divider with a 10kΩ resistor.

```text
        5V
         │
        LDR
         │
         ├──── Arduino Analog Pin
         │
        10kΩ
         │
        GND
```

LDR 1 → A0

LDR 2 → A1

---

## INA219 Connections

The INA219 communicates with the Arduino using I2C.

```text
INA219          Arduino UNO
--------------------------------
VCC        →    5V
GND        →    GND
SDA        →    A4
SCL        →    A5
```

### INA219 Power Path

The INA219 is placed in the solar-panel/load power path.

```text
Solar Panel (+)
      │
      ↓
   INA219 VIN+
   INA219 VIN-
      │
      ↓
   LED / LOAD (+)

LED / LOAD (-)
      │
      ↓
Solar Panel (-)
```

The exact physical polarity of the solar-panel wires must be verified before changing the existing wiring.

---

# 4. SOFTWARE REQUIREMENTS

You need the following software:

### Required

- Git
- Python
- Arduino IDE
- A web browser

### Python

The backend uses:

- Flask
- Flask-SocketIO
- PySerial

### Frontend

The dashboard uses:

- HTML
- CSS
- JavaScript

### Arduino

The Arduino sketch uses:

- Wire
- Servo
- Adafruit INA219

---

# 5. CLONE THE PROJECT

Open **PowerShell** or **Command Prompt**.

Run:

```powershell
git clone https://github.com/vedantp404/SolarSync.git
```

Enter the project folder:

```powershell
cd SolarSync
```

Check the files:

```powershell
dir
```

The project should contain:

```text
SolarSync/
│
├── README.md
├── requirements.txt
├── .gitignore
│
├── arduino/
│   └── new_solar_trackerr/
│       └── new_solar_trackerr.ino
│
├── backend/
│   └── server.py
│
└── dashboard/
    ├── index.html
    └── static/
        ├── script.js
        └── style.css
```

---

# 6. PYTHON SETUP

Check that Python is installed:

```powershell
python --version
```

Python 3.x is required.

---

## Create a virtual environment

From inside the `SolarSync` folder:

```powershell
python -m venv .venv
```

---

## Activate the virtual environment

```powershell
.\.venv\Scripts\Activate.ps1
```

After activation, PowerShell should show something similar to:

```text
(.venv) PS C:\...\SolarSync>
```

### If PowerShell blocks activation

Run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then:

```powershell
.\.venv\Scripts\Activate.ps1
```

---

# 7. INSTALL PYTHON DEPENDENCIES

Run:

```powershell
python -m pip install --upgrade pip
```

Then:

```powershell
pip install -r requirements.txt
```

The required Python packages are defined in `requirements.txt`.

---

# 8. ARDUINO IDE SETUP

Install Arduino IDE.

Open the Arduino sketch:

```text
arduino/new_solar_trackerr/new_solar_trackerr.ino
```

---

# 9. INSTALL REQUIRED ARDUINO LIBRARY

The sketch contains:

```cpp
#include <Wire.h>
#include <Servo.h>
#include <Adafruit_INA219.h>
```

## Wire

`Wire.h` is part of the Arduino environment.

No separate installation is normally required.

## Servo

`Servo.h` is a standard Arduino library.

No separate installation is normally required.

## Adafruit INA219

This library must be installed.

### Installation

In Arduino IDE:

```text
Sketch
→ Include Library
→ Manage Libraries
```

Search for:

```text
Adafruit INA219
```

Install:

```text
Adafruit INA219
```

If Arduino IDE asks to install additional library dependencies, allow it to install them.

---

# 10. CONNECT THE ARDUINO

Connect the Arduino UNO to the computer using USB.

In Arduino IDE:

```text
Tools
→ Board
→ Arduino UNO
```

Then check the COM port:

```text
Tools
→ Port
```

Example:

```text
COM4
```

The COM number may be different on another computer.

---

# 11. UPLOAD THE ARDUINO CODE

Open:

```text
arduino/new_solar_trackerr/new_solar_trackerr.ino
```

Select:

```text
Board → Arduino UNO
```

Select the correct:

```text
Port → COMx
```

Click:

```text
Upload
```

Wait until the upload completes successfully.

---

# 12. IMPORTANT: CHECK THE COM PORT

The Flask backend needs to know which COM port the Arduino is using.

Open:

```text
backend/server.py
```

Find the serial-port configuration.

It should look similar to:

```python
SERIAL_PORT = "COM4"
BAUD_RATE = 9600
```

### If the Arduino is on COM4

No change is required.

### If the Arduino is on another port

For example, if Arduino IDE shows:

```text
COM5
```

change:

```python
SERIAL_PORT = "COM4"
```

to:

```python
SERIAL_PORT = "COM5"
```

Keep:

```python
BAUD_RATE = 9600
```

unless the Arduino sketch has been intentionally changed.

---

# 13. IMPORTANT: CLOSE SERIAL MONITOR

Before running Flask:

**Close Arduino Serial Monitor.**

Also close:

- Arduino Serial Plotter
- Other serial-monitor programs
- Other programs currently connected to the Arduino COM port

The Arduino serial port should be available to the Flask backend.

---

# 14. RUN THE BACKEND

Make sure you are inside the project root:

```text
SolarSync/
```

and that your virtual environment is activated.

Run:

```powershell
python backend/server.py
```

You can also run:

```powershell
python -u backend/server.py
```

A successful startup should look similar to:

```text
Connected to Arduino on COM4
 * Serving Flask app 'server'
 * Debug mode: off
 * Running on http://127.0.0.1:5000
```

The COM number may be different.

---

# 15. OPEN THE WEB DASHBOARD

Open a browser.

Go to:

```text
http://127.0.0.1:5000
```

The SolarSync dashboard should open.

---

# 16. COMPLETE STARTUP SEQUENCE

For normal use, follow this order:

```text
1. Connect Arduino
       ↓
2. Check COM port
       ↓
3. Upload Arduino sketch if required
       ↓
4. Close Arduino Serial Monitor
       ↓
5. Open PowerShell
       ↓
6. cd SolarSync
       ↓
7. Activate .venv
       ↓
8. Run Flask backend
       ↓
9. Open 127.0.0.1:5000
       ↓
10. Start demonstration
```

---

# 17. DASHBOARD FEATURES

The dashboard provides:

## Real-Time Monitoring

- LDR 1 reading
- LDR 2 reading
- Panel angle
- Servo position
- Tracking direction
- AUTO / MANUAL mode

## Power Monitoring

- Panel voltage
- Panel current
- Output power
- Energy generated

## Controls

- AUTO mode
- MANUAL mode
- Manual angle
- Tracking sensitivity
- Tracking speed
- Return to center

## Analytics

- LDR comparison graph
- Panel-angle graph
- Power graph
- Light balance
- Light stability

## Additional Features

- LDR-based sky-condition estimation
- Sundial-style time display
- Session data logging
- CSV export
- Responsive web interface

---

# 18. HOW THE TRACKING WORKS

The Arduino continuously reads both LDR sensors.

```text
Read LDR1
    ↓
Read LDR2
    ↓
Compare readings
    ↓
Calculate difference
    ↓
Is difference greater than tolerance?
       ↓
     YES
       ↓
Determine stronger-light side
       ↓
Move servo by tracking step
       ↓
Read sensors again
```

When the difference becomes sufficiently small:

```text
LDR1 ≈ LDR2
     ↓
Hold servo position
```

The tolerance prevents unnecessary servo movement and oscillation.

---

# 19. AUTO MODE

In AUTO mode:

```text
LDRs
 ↓
Arduino
 ↓
Tracking decision
 ↓
Servo
 ↓
Panel movement
```

The system automatically tracks the detected stronger light direction.

---

# 20. MANUAL MODE

In MANUAL mode:

The user can control the panel angle from the dashboard.

Manual mode is useful for:

- Testing
- Calibration
- Demonstration
- Checking different panel positions

---

# 21. POWER CALCULATION

The INA219 provides voltage and current measurements.

Power is calculated as:

```text
Power = Voltage × Current
```

For example:

```text
5 V × 0.1 A = 0.5 W
```

The actual value displayed by the dashboard depends on the current illumination and load.

The prototype solar panel is approximately:

```text
6 V
100 mA
```

Approximate rated power:

```text
6 × 0.1 = 0.6 W
```

---

# 22. DATA LOGGING

The dashboard supports session data logging.

Logged information can include:

- Date
- Time
- Day
- Sky condition estimate
- Ambient brightness
- Average LDR
- LDR 1
- LDR 2
- Light difference
- Light balance
- Light stability
- Panel angle
- Servo position
- Tracking direction
- Mode
- Voltage
- Current
- Power
- Energy
- Tracking status

The session can be exported as CSV.

---

# 23. SKY CONDITION ESTIMATION

The dashboard includes an LDR-based sky-condition estimate such as:

- Very Dark
- Overcast / Low Light
- Cloudy
- Partly Cloudy
- Sunny / Bright

### Important

This is an **LDR-based estimate**.

It is **not actual meteorological weather data** and does not represent measurements from a dedicated weather sensor.

---

# 24. SYSTEM ARCHITECTURE

```text
                 SOLAR PANEL
                     │
                     ├─────────────► INA219
                     │                │
                     │                └── Voltage / Current / Power
                     │
                     ▼
                   LOAD


LDR 1 ──────────────┐
                    │
                    ▼
                Arduino UNO
                    ▲
                    │
LDR 2 ──────────────┘
                    │
                    ▼
                SG90 Servo
                    │
                    ▼
              Panel Movement


Arduino UNO
     │
     │ USB Serial
     ▼
   PySerial
     │
     ▼
 Flask Backend
     │
     │ Socket.IO
     ▼
 JavaScript Frontend
     │
     ▼
 Web Dashboard
```

---

# 25. TROUBLESHOOTING

## Problem: COM Port Access Denied

Error:

```text
PermissionError(13, 'Access is denied.')
```

### Fix

1. Close Arduino Serial Monitor.
2. Close Arduino Serial Plotter.
3. Close other serial-monitor applications.
4. Close other running Flask/Python programs.
5. Reconnect the Arduino.
6. Check the COM port again.
7. Update `SERIAL_PORT` in `backend/server.py`.

You can stop running Python processes using:

```powershell
taskkill /F /IM python.exe
```

Then restart the backend.

---

# 26. Problem: Arduino COM Port Changed

Open:

```text
Arduino IDE
→ Tools
→ Port
```

Example:

```text
COM5
```

Then open:

```text
backend/server.py
```

Change:

```python
SERIAL_PORT = "COM4"
```

to:

```python
SERIAL_PORT = "COM5"
```

---

# 27. Problem: Dashboard Opens but No Live Data Appears

Check:

```text
1. Arduino is connected
2. Correct COM port is selected
3. Arduino sketch has been uploaded
4. Serial Monitor is closed
5. Flask backend is running
6. server.py has the correct COM port
```

---

# 28. Problem: Arduino Compilation Error

If you see:

```text
Adafruit_INA219.h: No such file or directory
```

install:

```text
Adafruit INA219
```

using:

```text
Arduino IDE
→ Sketch
→ Include Library
→ Manage Libraries
```

Search:

```text
Adafruit INA219
```

and install it.

---

# 29. Problem: Power Values Are Zero or Very Low

Check:

1. The solar panel is receiving sufficient light.
2. INA219 wiring is correct.
3. The load is connected correctly.
4. Panel polarity is correct.
5. The INA219 is connected to the Arduino through SDA/SCL.
6. The INA219 library is installed.
7. The Arduino sketch has been uploaded successfully.

The measured power depends on the actual illumination and load.

---

# 30. STOP THE SERVER

To stop Flask:

```text
Ctrl + C
```

---

# 31. PRESENTATION / EXHIBITION PROCEDURE

Before the exhibition:

### Hardware

- Arduino connected
- Solar panel connected
- LDRs connected
- Servo connected
- INA219 connected
- Load connected

### Software

- Arduino sketch uploaded
- Correct COM port selected
- Arduino Serial Monitor closed
- Flask backend running
- Dashboard open

### Demonstration

1. Open dashboard.
2. Select AUTO mode.
3. Move the light source toward one side.
4. Show the LDR readings becoming different.
5. Show the servo moving the panel.
6. Show the panel settling when the readings become balanced.
7. Show INA219 voltage/current/power.
8. Show the corresponding values on the dashboard.
9. Switch to MANUAL mode.
10. Demonstrate manual panel-angle control.
11. Show graphs and session logging.

---

# 32. PROJECT LIMITATIONS

The current prototype has the following limitations:

- Single-axis tracking
- LDR readings can be affected by shadows and uneven illumination
- SG90 servo has limited torque and precision
- Performance depends on available light
- Dashboard currently runs through a computer-hosted Flask server
- Prototype is intended for demonstration and experimentation

---

# 33. FUTURE SCOPE

Possible improvements include:

- Dual-axis tracking
- Higher-torque motor/actuator
- Position encoder
- Limit switches
- Power-feedback-based tracking optimization
- Solar-position calculation
- Adaptive tracking algorithms
- Environmental sensors
- Cloud/remote monitoring
- Large-scale industrial hardware

---

# 34. IMPORTANT TECHNICAL FACTS

Remember these values:

```text
Project Type       → Single-axis solar tracker
Controller         → Arduino UNO
LDR 1              → A0
LDR 2              → A1
Servo              → D4
INA219 SDA         → A4
INA219 SCL         → A5
INA219 VCC         → 5V
INA219 GND         → GND
Serial Baud Rate   → 9600
Backend            → Python Flask
Real-Time          → Flask-SocketIO
Serial Library     → PySerial
Frontend            → HTML + CSS + JavaScript
Panel Rating       → 6V, 100mA
Approx. Rated Power→ 0.6W
```

---

# 35. PROJECT STRUCTURE

```text
SolarSync/
│
├── README.md
├── requirements.txt
├── .gitignore
│
├── arduino/
│   └── new_solar_trackerr/
│       └── new_solar_trackerr.ino
│
├── backend/
│   └── server.py
│
└── dashboard/
    ├── index.html
    └── static/
        ├── script.js
        └── style.css
```

---

# 36. QUICK START

For future runs, once everything is already installed:

```powershell
cd SolarSync
.\.venv\Scripts\Activate.ps1
python backend/server.py
```

Then open:

```text
http://127.0.0.1:5000
```

Remember:

> **Close Arduino Serial Monitor before running Flask.**

---

# 37. GITHUB REPOSITORY

Repository:

https://github.com/vedantp404/SolarSync

---

## SolarSync

### Sense → Track → Measure → Visualize

**Dual-LDR Solar Tracking + INA219 Power Monitoring + Real-Time Web Dashboard**