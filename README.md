\# SolarSync



\## Dual-LDR Based Automatic Solar Tracking System With Real-Time Web Dashboard



SolarSync is a single-axis automatic solar tracking system that uses two LDR sensors to detect differences in light intensity, an Arduino UNO to control the tracking logic, an SG90 servo motor for panel movement, an INA219 module for voltage/current monitoring, and a Flask-based web dashboard for real-time monitoring and control.



\## Hardware



\- Arduino UNO

\- 2 × LDR sensors

\- 2 × 10kΩ resistors

\- SG90 servo motor

\- 6V 100mA solar panel

\- INA219 power monitoring module

\- LED/load



\## Arduino Connections



| Component | Arduino UNO |

|---|---|

| LDR 1 | A0 |

| LDR 2 | A1 |

| Servo Signal | D4 |

| INA219 SDA | A4 |

| INA219 SCL | A5 |

| INA219 VCC | 5V |

| INA219 GND | GND |



\## Software



\### Backend



\- Python

\- Flask

\- Flask-SocketIO

\- PySerial



\### Frontend



\- HTML

\- CSS

\- JavaScript



\## Setup



\### 1. Clone the repository



```powershell

git clone https://github.com/vedantp404/SolarSync.git

cd SolarSync

