import serial
import threading
import time

from flask import Flask, render_template
from flask_socketio import SocketIO


# ==========================================
# FLASK
# ==========================================

app = Flask(
    __name__,
    template_folder="../dashboard",
    static_folder="../dashboard/static"
)

socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)


# ==========================================
# ARDUINO
# ==========================================

SERIAL_PORT = "COM4"
BAUD_RATE = 9600

arduino = None

serial_lock = threading.Lock()


# ==========================================
# CONNECT ARDUINO
# ==========================================

def connect_arduino():

    global arduino

    try:

        arduino = serial.Serial(
            SERIAL_PORT,
            BAUD_RATE,
            timeout=1
        )

        print(
            f"Connected to Arduino on {SERIAL_PORT}"
        )

        time.sleep(2)

    except Exception as e:

        print(
            "Could not connect to Arduino:"
        )

        print(e)


# ==========================================
# SEND COMMAND TO ARDUINO
# ==========================================

def send_command(command):

    global arduino

    if arduino is None:
        return

    try:

        with serial_lock:

            arduino.write(
                (command + "\n").encode()
            )

            arduino.flush()

        print(
            f"Arduino command: {command}"
        )

    except Exception as e:

        print(
            "Command error:",
            e
        )


# ==========================================
# DASHBOARD COMMAND
# ==========================================

@socketio.on("control_command")
def handle_control_command(command):

    if not isinstance(command, str):
        return

    send_command(command)


# ==========================================
# PARSE NUMERIC VALUES
# ==========================================

def parse_value(value):

    try:

        number = float(value)

        if number.is_integer():
            return int(number)

        return number

    except (TypeError, ValueError):

        return None


# ==========================================
# READ ARDUINO
# ==========================================

def read_serial():

    global arduino

    while True:

        if arduino is None:

            time.sleep(0.1)

            continue

        try:

            line = (
                arduino.readline()
                .decode(
                    "utf-8",
                    errors="ignore"
                )
                .strip()
            )

            if not line:
                continue


            values = {}

            parts = line.split(",")


            for part in parts:

                if ":" not in part:
                    continue


                key, value = part.split(
                    ":",
                    1
                )


                key = key.strip()
                value = value.strip()


                # ------------------------------
                # MODE is text
                # ------------------------------

                if key == "MODE":

                    values[key] = value

                    continue


                # ------------------------------
                # All other values are numeric
                # ------------------------------

                parsed = parse_value(
                    value
                )


                if parsed is not None:

                    values[key] = parsed


            # ----------------------------------
            # Emit valid sensor packets
            # ----------------------------------

            if (
                "LDR1" in values and
                "LDR2" in values
            ):

                socketio.emit(
                    "sensor_data",
                    values
                )


        except Exception as e:

            print(
                "Serial error:",
                e
            )

            time.sleep(0.2)


# ==========================================
# MAIN PAGE
# ==========================================

@app.route("/")
def index():

    return render_template(
        "index.html"
    )


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    connect_arduino()


    serial_thread = threading.Thread(
        target=read_serial,
        daemon=True
    )

    serial_thread.start()


    socketio.run(
        app,
        host="127.0.0.1",
        port=5000,
        debug=False,
        allow_unsafe_werkzeug=True
    )