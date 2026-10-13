const socket = io();


// ============================================================
// ELEMENTS
// ============================================================

// Connection
const statusElement =
    document.getElementById("status");


// Sensors
const ldr1Element =
    document.getElementById("ldr1");

const ldr2Element =
    document.getElementById("ldr2");

const ldr1Bar =
    document.getElementById("ldr1Bar");

const ldr2Bar =
    document.getElementById("ldr2Bar");

const differenceElement =
    document.getElementById("difference");

const directionElement =
    document.getElementById("direction");


// Panel / Servo
const servoElement =
    document.getElementById("servo");

const angleElement =
    document.getElementById("angle");

const angleGraphValue =
    document.getElementById("angleGraphValue");

const panel =
    document.getElementById("panel");


// Tracking
const trackingStatus =
    document.getElementById("trackingStatus");

const trackingMessage =
    document.getElementById("trackingMessage");


// Solar scene
const sun =
    document.getElementById("sun");

const solarScene =
    document.querySelector(".solar-scene");

const sunPositionDot =
    document.getElementById("sunPositionDot");


// ============================================================
// CONTROLS
// ============================================================

const autoButton =
    document.getElementById("autoButton");

const manualButton =
    document.getElementById("manualButton");

const modeBadge =
    document.getElementById("modeBadge");

const manualAngle =
    document.getElementById("manualAngle");

const manualAngleValue =
    document.getElementById("manualAngleValue");

const toleranceSlider =
    document.getElementById("toleranceSlider");

const toleranceValue =
    document.getElementById("toleranceValue");

const stepSlider =
    document.getElementById("stepSlider");

const stepValue =
    document.getElementById("stepValue");

const centerButton =
    document.getElementById("centerButton");


// ============================================================
// HARDWARE STATUS
// ============================================================

const arduinoHealth =
    document.getElementById("arduinoHealth");

const ldr1Health =
    document.getElementById("ldr1Health");

const ldr2Health =
    document.getElementById("ldr2Health");

const servoHealth =
    document.getElementById("servoHealth");

const powerHealth =
    document.getElementById("powerHealth");


// ============================================================
// LIGHT BALANCE
// ============================================================

const balanceScore =
    document.getElementById("balanceScore");

const balanceFill =
    document.getElementById("balanceFill");


// ============================================================
// POWER MONITORING
// ============================================================

const powerVoltageElement =
    document.getElementById("powerVoltage");

const powerCurrentElement =
    document.getElementById("powerCurrent");

const powerOutputElement =
    document.getElementById("powerOutput");

const powerEnergyElement =
    document.getElementById("powerEnergy");

const powerStatusElement =
    document.getElementById("powerStatus");

const powerStatusDot =
    document.getElementById("powerStatusDot");


// ============================================================
// DATA LOGGER
// ============================================================

const sampleCount =
    document.getElementById("sampleCount");

const downloadCSV =
    document.getElementById("downloadCSV");

const clearHistory =
    document.getElementById("clearHistory");


// ============================================================
// SESSION SUMMARY
// ============================================================

const summaryDate =
    document.getElementById("summaryDate");

const summaryTime =
    document.getElementById("summaryTime");

const summaryDay =
    document.getElementById("summaryDay");

const summarySkyCondition =
    document.getElementById("summarySky");

const summaryWeatherSource =
    document.getElementById("summaryWeatherSource");

const summaryWeatherConfidence =
    document.getElementById("summaryWeatherConfidence");

const summaryAmbientBrightness =
    document.getElementById("summaryBrightness");

const summaryAverageLDR =
    document.getElementById("summaryAverageLDR");

const summaryLDR1 =
    document.getElementById("summaryLDR1");

const summaryLDR2 =
    document.getElementById("summaryLDR2");

const summaryDifference =
    document.getElementById("summaryDifference");

const summaryBalance =
    document.getElementById("summaryBalance");

const summaryStability =
    document.getElementById("summaryStability");

const summaryPanelAngle =
    document.getElementById("summaryPanelAngle");

const summaryRawServo =
    document.getElementById("summaryServo");

const summaryVoltage =
    document.getElementById("summaryVoltage");

const summaryCurrent =
    document.getElementById("summaryCurrent");

const summaryPower =
    document.getElementById("summaryPower");

const summaryEnergy =
    document.getElementById("summaryEnergy");

const summaryDirection =
    document.getElementById("summaryDirection");

const summaryMode =
    document.getElementById("summaryMode");

const summaryTrackingStatus =
    document.getElementById("summaryTracking");

const summaryCsvCount =
    document.getElementById("summarySnapshotCount");

const summaryStatus =
    document.getElementById("summaryStatus");

const summaryBrightnessBar =
    document.getElementById("summaryBrightnessBar");

const summaryBalanceBar =
    document.getElementById("summaryBalanceBar");

const summaryStabilityBar =
    document.getElementById("summaryStabilityBar");



// ============================================================
// SUNDIAL
// ============================================================

const realTimeElement =
    document.getElementById("realTime");

const realDateElement =
    document.getElementById("realDate");

const sundialShadow =
    document.getElementById("sundialShadow");


// ============================================================
// ENVIRONMENT / SKY CONDITION
// ============================================================

const skyIcon =
    document.getElementById("skyIcon");

const skyCondition =
    document.getElementById("skyCondition");

const weatherConfidence =
    document.getElementById("weatherConfidence");

const ambientBrightness =
    document.getElementById("ambientBrightness");

const ambientFill =
    document.getElementById("ambientFill");

const averageLDR =
    document.getElementById("averageLDR");

const weatherStability =
    document.getElementById("weatherStability");

const weatherDifference =
    document.getElementById("weatherDifference");

const weatherExplanation =
    document.getElementById("weatherExplanation");


// ============================================================
// GRAPHS
// ============================================================

const angleCanvas =
    document.getElementById("angleChart");

const ldrCanvas =
    document.getElementById("ldrChart");

const powerCanvas =
    document.getElementById("powerChart");

const powerGraphValue =
    document.getElementById("powerGraphValue");

const powerAxisTop =
    document.getElementById("powerAxisTop");

const powerAxis75 =
    document.getElementById("powerAxis75");

const powerAxis50 =
    document.getElementById("powerAxis50");

const powerAxis25 =
    document.getElementById("powerAxis25");


// ============================================================
// THEME
// ============================================================

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const themeText =
    document.getElementById("themeText");


// ============================================================
// STATE
// ============================================================

let currentMode = "AUTO";


// ------------------------------------------------------------
// LIVE GRAPH DATA
// ------------------------------------------------------------

let historyData = [];

const MAX_HISTORY = 300;


// ------------------------------------------------------------
// CSV DATA
// ------------------------------------------------------------

let csvData = [];

const CSV_INTERVAL_MS =
    30 * 1000;

let lastCsvSampleTime = 0;


// ------------------------------------------------------------
// ENVIRONMENT DATA
// ------------------------------------------------------------

let environmentSamples = [];

const MAX_ENVIRONMENT_SAMPLES = 30;

let currentEnvironment = {

    icon: "☀",

    label: "Waiting for sensor data",

    confidence: "—",

    explanation:
        "Waiting for sufficient LDR readings...",

    average: 0,

    brightness: 0,

    stability: 100

};


// ------------------------------------------------------------
// PANEL
// ------------------------------------------------------------

let lastPanelAngle = 0;


// ------------------------------------------------------------
// POWER
// ------------------------------------------------------------

let currentPower = {

    voltage: 0,

    current_mA: 0,

    power_W: 0

};


// Session energy in Wh
let sessionEnergyWh = 0;


// Used for numerical integration of energy
let lastPowerTimestamp = 0;


// ============================================================
// HELPERS
// ============================================================

function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


function setText(
    element,
    value
) {

    if (element) {

        element.textContent =
            value;

    }

}


// ============================================================
// DATE / TIME
// ============================================================

function getLocalDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );

    return `${year}-${month}-${day}`;

}


function getCsvDate(date) {

    return `'${getLocalDate(date)}`;

}


function getLocalTime(date) {

    const hours =
        String(
            date.getHours()
        ).padStart(
            2,
            "0"
        );

    const minutes =
        String(
            date.getMinutes()
        ).padStart(
            2,
            "0"
        );

    const seconds =
        String(
            date.getSeconds()
        ).padStart(
            2,
            "0"
        );

    return `${hours}:${minutes}:${seconds}`;

}


function getDayName(date) {

    return date.toLocaleDateString(
        "en-IN",
        {
            weekday: "long"
        }
    );

}


// ============================================================
// POWER FORMATTING
// ============================================================

function formatVoltage(value) {

    const number =
        Number(value);

    if (!Number.isFinite(number)) {

        return "0.000 V";

    }

    return `${number.toFixed(3)} V`;

}


function formatCurrent(value) {

    let number =
        Number(value);

    if (!Number.isFinite(number)) {

        number = 0;

    }

    // Ignore tiny negative sensor noise
    if (
        number < 0 &&
        number > -0.5
    ) {

        number = 0;

    }

    // For the dashboard we do not display
    // negative generated current.
    number =
        Math.max(
            0,
            number
        );

    return `${number.toFixed(3)} mA`;

}


function formatPower(value) {

    let watts =
        Number(value);

    if (!Number.isFinite(watts)) {

        watts = 0;

    }

    watts =
        Math.max(
            0,
            watts
        );


    const milliwatts =
        watts * 1000;


    if (milliwatts < 1000) {

        return `${milliwatts.toFixed(3)} mW`;

    }


    return `${watts.toFixed(3)} W`;

}


function formatEnergy(value) {

    let wh =
        Number(value);

    if (!Number.isFinite(wh)) {

        wh = 0;

    }

    wh =
        Math.max(
            0,
            wh
        );


    const mWh =
        wh * 1000;


    if (mWh < 1000) {

        return `${mWh.toFixed(3)} mWh`;

    }


    return `${wh.toFixed(3)} Wh`;

}


// ============================================================
// POWER INTEGRATION
// ============================================================

function integrateEnergy(
    powerWatts,
    timestamp
) {

    if (
        !Number.isFinite(powerWatts) ||
        !Number.isFinite(timestamp)
    ) {

        return;

    }


    if (lastPowerTimestamp === 0) {

        lastPowerTimestamp =
            timestamp;

        return;

    }


    let elapsedSeconds =
        (
            timestamp -
            lastPowerTimestamp
        ) / 1000;


    // Protect against browser sleep,
    // tab switching and abnormal intervals.
    elapsedSeconds =
        clamp(
            elapsedSeconds,
            0,
            5
        );


    sessionEnergyWh +=
        powerWatts *
        (
            elapsedSeconds /
            3600
        );


    lastPowerTimestamp =
        timestamp;


    setText(
        powerEnergyElement,
        formatEnergy(
            sessionEnergyWh
        )
    );


    setText(
        summaryEnergy,
        formatEnergy(
            sessionEnergyWh
        )
    );

}


// ============================================================
// POWER DISPLAY
// ============================================================

function updatePowerDisplay(
    voltage,
    current_mA,
    powerWatts
) {

    let safeVoltage =
        Number(voltage);

    let safeCurrent =
        Number(current_mA);

    let safePower =
        Number(powerWatts);


    if (!Number.isFinite(safeVoltage)) {

        safeVoltage = 0;

    }

    if (!Number.isFinite(safeCurrent)) {

        safeCurrent = 0;

    }

    if (!Number.isFinite(safePower)) {

        safePower = 0;

    }


    // Small negative INA219 noise
    if (
        safeCurrent < 0 &&
        safeCurrent > -0.5
    ) {

        safeCurrent = 0;

    }


    safeCurrent =
        Math.max(
            0,
            safeCurrent
        );


    // Calculate power from V × I.
    // This gives better precision for the
    // very small output of the prototype.

    const calculatedPower =
        Math.max(
            0,
            safeVoltage *
            (
                safeCurrent /
                1000
            )
        );


    // Prefer calculated power because
    // the Arduino is already sending it,
    // but protect against invalid values.

    if (
        Math.abs(
            calculatedPower -
            safePower
        ) >
        Math.max(
            0.01,
            calculatedPower * 0.5
        )
    ) {

        safePower =
            calculatedPower;

    }


    currentPower = {

        voltage:
            safeVoltage,

        current_mA:
            safeCurrent,

        power_W:
            safePower

    };


    // Main power cards

    setText(
        powerVoltageElement,
        formatVoltage(
            safeVoltage
        )
    );


    setText(
        powerCurrentElement,
        formatCurrent(
            safeCurrent
        )
    );


    setText(
        powerOutputElement,
        formatPower(
            safePower
        )
    );


    setText(
        powerEnergyElement,
        formatEnergy(
            sessionEnergyWh
        )
    );


    // Power status

    if (powerStatusElement) {

        powerStatusElement.textContent =
            "INA219 • LIVE";

    }


    if (powerStatusDot) {

        powerStatusDot.style.background =
            "#55e69a";

    }


    if (powerHealth) {

        powerHealth.textContent =
            "● Working";

        powerHealth.style.color =
            "#55e69a";

    }


    // Summary

    setText(
        summaryVoltage,
        formatVoltage(
            safeVoltage
        )
    );


    setText(
        summaryCurrent,
        formatCurrent(
            safeCurrent
        )
    );


    setText(
        summaryPower,
        formatPower(
            safePower
        )
    );


    setText(
        summaryEnergy,
        formatEnergy(
            sessionEnergyWh
        )
    );


    // Graph header

    setText(
        powerGraphValue,
        formatPower(
            safePower
        )
    );


    updatePowerAxis(
        safePower
    );

}


// ============================================================
// POWER GRAPH AXIS
// ============================================================

function updatePowerAxis(
    latestPower
) {

    let maxValue =
        Math.max(
            latestPower,
            ...historyData.map(
                item =>
                    Number(
                        item.power || 0
                    )
            )
        );


    // Always keep a useful minimum scale.
    maxValue =
        Math.max(
            maxValue,
            0.001
        );


    // Add headroom.
    maxValue *= 1.2;


    // Round to sensible steps.
    const exponent =
        Math.floor(
            Math.log10(
                maxValue
            )
        );


    const magnitude =
        Math.pow(
            10,
            exponent
        );


    maxValue =
        Math.ceil(
            maxValue /
            magnitude
        ) *
        magnitude;


    const q75 =
        maxValue * 0.75;

    const q50 =
        maxValue * 0.50;

    const q25 =
        maxValue * 0.25;


    function axisText(
        value
    ) {

        const mW =
            value * 1000;

        if (mW < 1000) {

            return `${mW.toFixed(2)} mW`;

        }

        return `${value.toFixed(2)} W`;

    }


    setText(
        powerAxisTop,
        axisText(
            maxValue
        )
    );

    setText(
        powerAxis75,
        axisText(
            q75
        )
    );

    setText(
        powerAxis50,
        axisText(
            q50
        )
    );

    setText(
        powerAxis25,
        axisText(
            q25
        )
    );

}


// ============================================================
// SEND COMMAND
// ============================================================

function sendCommand(
    command
) {

    socket.emit(
        "control_command",
        command
    );

}


// ============================================================
// SOCKET CONNECTION
// ============================================================

socket.on(
    "connect",
    () => {

        setText(
            statusElement,
            "● DASHBOARD ONLINE"
        );


        if (statusElement) {

            statusElement.classList.remove(
                "offline"
            );

            statusElement.classList.add(
                "online"
            );

        }


        setText(
            arduinoHealth,
            "● Connected"
        );


        if (arduinoHealth) {

            arduinoHealth.style.color =
                "#55e69a";

        }

    }
);


socket.on(
    "disconnect",
    () => {

        setText(
            statusElement,
            "● DISCONNECTED"
        );


        if (statusElement) {

            statusElement.classList.remove(
                "online"
            );

            statusElement.classList.add(
                "offline"
            );

        }


        setText(
            arduinoHealth,
            "● Disconnected"
        );


        if (arduinoHealth) {

            arduinoHealth.style.color =
                "#ff6b6b";

        }


        setText(
            powerStatusElement,
            "INA219 • DISCONNECTED"
        );


        setText(
            powerHealth,
            "● Disconnected"
        );


        if (powerHealth) {

            powerHealth.style.color =
                "#ff6b6b";

        }


        setText(
            trackingStatus,
            "Arduino connection lost"
        );


        setText(
            trackingMessage,
            "Waiting for Arduino..."
        );


        setText(
            summaryStatus,
            "OFFLINE"
        );

    }
);


// ============================================================
// MODE CONTROL
// ============================================================

function setMode(
    mode
) {

    currentMode =
        mode;


    sendCommand(
        `MODE:${mode}`
    );


    if (
        mode ===
        "AUTO"
    ) {

        if (autoButton) {

            autoButton.classList.add(
                "active"
            );

        }


        if (manualButton) {

            manualButton.classList.remove(
                "active"
            );

        }


        setText(
            modeBadge,
            "AUTO"
        );


        if (modeBadge) {

            modeBadge.className =
                "mode-badge auto";

        }


        if (manualAngle) {

            manualAngle.disabled =
                true;

        }

    }

    else {

        if (manualButton) {

            manualButton.classList.add(
                "active"
            );

        }


        if (autoButton) {

            autoButton.classList.remove(
                "active"
            );

        }


        setText(
            modeBadge,
            "MANUAL"
        );


        if (modeBadge) {

            modeBadge.className =
                "mode-badge manual";

        }


        if (manualAngle) {

            manualAngle.disabled =
                false;

        }

    }


    setText(
        summaryMode,
        currentMode
    );

}


if (autoButton) {

    autoButton.addEventListener(
        "click",
        () => {

            setMode(
                "AUTO"
            );

        }
    );

}


if (manualButton) {

    manualButton.addEventListener(
        "click",
        () => {

            setMode(
                "MANUAL"
            );

        }
    );

}


// ============================================================
// MANUAL ANGLE
// ============================================================

if (manualAngle) {

    manualAngle.addEventListener(
        "input",
        () => {

            const angle =
                Number(
                    manualAngle.value
                );


            setText(
                manualAngleValue,
                `${angle}°`
            );


            if (
                currentMode ===
                "MANUAL"
            ) {

                sendCommand(
                    `ANGLE:${angle}`
                );

            }

        }
    );

}


// ============================================================
// LDR SENSITIVITY
// ============================================================

if (toleranceSlider) {

    toleranceSlider.addEventListener(
        "input",
        () => {

            const value =
                Number(
                    toleranceSlider.value
                );


            setText(
                toleranceValue,
                value
            );


            sendCommand(
                `TOL:${value}`
            );

        }
    );

}


// ============================================================
// TRACKING SPEED
// ============================================================

if (stepSlider) {

    stepSlider.addEventListener(
        "input",
        () => {

            const value =
                Number(
                    stepSlider.value
                );


            setText(
                stepValue,
                value
            );


            sendCommand(
                `STEP:${value}`
            );

        }
    );

}


// ============================================================
// CENTER
// ============================================================

if (centerButton) {

    centerButton.addEventListener(
        "click",
        () => {

            sendCommand(
                "CENTER"
            );


            if (manualAngle) {

                manualAngle.value =
                    0;

            }


            setText(
                manualAngleValue,
                "0°"
            );

        }
    );

}


// ============================================================
// SENSOR DATA
// ============================================================

socket.on(
    "sensor_data",
    (data) => {

        const ldr1 =
            Number(
                data?.LDR1
            );


        const ldr2 =
            Number(
                data?.LDR2
            );


        const panelAngle =
            Number(
                data?.PANEL
            );


        const rawAngle =
            Number(
                data?.RAW
            );


        const voltage =
            Number(
                data?.VOLTAGE
            );


        const current_mA =
            Number(
                data?.CURRENT
            );


        const power_W =
            Number(
                data?.POWER
            );


        // ------------------------------------------
        // Basic validation
        // ------------------------------------------

        if (
            !Number.isFinite(ldr1) ||
            !Number.isFinite(ldr2) ||
            !Number.isFinite(panelAngle) ||
            !Number.isFinite(rawAngle)
        ) {

            return;

        }


        // ====================================================
        // SAFE VALUES
        // ====================================================

        const safeLDR1 =
            clamp(
                ldr1,
                0,
                1023
            );


        const safeLDR2 =
            clamp(
                ldr2,
                0,
                1023
            );


        const safePanelAngle =
            clamp(
                panelAngle,
                -90,
                90
            );


        const safeRawAngle =
            clamp(
                rawAngle,
                0,
                180
            );


        lastPanelAngle =
            safePanelAngle;


        // ====================================================
        // POWER DATA
        // ====================================================

        if (
            Number.isFinite(voltage) &&
            Number.isFinite(current_mA) &&
            Number.isFinite(power_W)
        ) {

            const nowMs =
                Date.now();


            integrateEnergy(
                Math.max(
                    0,
                    power_W
                ),
                nowMs
            );


            updatePowerDisplay(
                voltage,
                current_mA,
                power_W
            );

        }


        // ====================================================
        // LDR DISPLAY
        // ====================================================

        setText(
            ldr1Element,
            Math.round(
                safeLDR1
            )
        );


        setText(
            ldr2Element,
            Math.round(
                safeLDR2
            )
        );


        if (ldr1Bar) {

            ldr1Bar.style.width =
                `${(
                    safeLDR1 /
                    1023
                ) * 100}%`;

        }


        if (ldr2Bar) {

            ldr2Bar.style.width =
                `${(
                    safeLDR2 /
                    1023
                ) * 100}%`;

        }


        // ====================================================
        // LIGHT DIFFERENCE
        // ====================================================

        const difference =
            safeLDR1 -
            safeLDR2;


        setText(
            differenceElement,
            Math.round(
                difference
            )
        );


        // ====================================================
        // TRACKING DIRECTION
        // ====================================================

        const tolerance =
            toleranceSlider
                ? Number(
                    toleranceSlider.value
                )
                : 40;


        let direction =
            "CENTER";


        if (
            difference >
            tolerance
        ) {

            direction =
                "RIGHT";


            setText(
                directionElement,
                "RIGHT →"
            );


            setText(
                trackingStatus,
                "Tracking toward LDR 1"
            );


            setText(
                trackingMessage,
                "Tracking active — moving right"
            );

        }


        else if (
            difference <
            -tolerance
        ) {

            direction =
                "LEFT";


            setText(
                directionElement,
                "← LEFT"
            );


            setText(
                trackingStatus,
                "Tracking toward LDR 2"
            );


            setText(
                trackingMessage,
                "Tracking active — moving left"
            );

        }


        else {

            direction =
                "CENTER";


            setText(
                directionElement,
                "CENTER"
            );


            setText(
                trackingStatus,
                "Light balanced"
            );


            setText(
                trackingMessage,
                "Panel aligned with detected light"
            );

        }


        // ====================================================
        // MODE
        // ====================================================

        if (
            typeof data.MODE ===
            "string"
        ) {

            const mode =
                data.MODE.toUpperCase();


            if (
                mode === "AUTO" ||
                mode === "MANUAL"
            ) {

                currentMode =
                    mode;


                if (autoButton) {

                    autoButton.classList.toggle(
                        "active",
                        mode === "AUTO"
                    );

                }


                if (manualButton) {

                    manualButton.classList.toggle(
                        "active",
                        mode === "MANUAL"
                    );

                }


                setText(
                    modeBadge,
                    mode
                );


                if (modeBadge) {

                    modeBadge.className =
                        `mode-badge ${
                            mode.toLowerCase()
                        }`;

                }


                if (manualAngle) {

                    manualAngle.disabled =
                        mode !== "MANUAL";

                }

            }

        }


        // ====================================================
        // ANGLES
        // ====================================================

        setText(
            angleElement,
            `${Math.round(
                safePanelAngle
            )}°`
        );


        setText(
            servoElement,
            `${Math.round(
                safeRawAngle
            )}°`
        );


        setText(
            angleGraphValue,
            `${Math.round(
                safePanelAngle
            )}°`
        );


        if (panel) {

            panel.style.transform =
                `translateX(-50%) rotate(${
                    safePanelAngle
                }deg)`;

        }


        // ====================================================
        // SUN POSITION
        // ====================================================

        updateSunPosition(
            safePanelAngle
        );


        if (sunPositionDot) {

            const positionPercent =
                (
                    (
                        safePanelAngle +
                        90
                    ) /
                    180
                ) *
                100;


            sunPositionDot.style.left =
                `${clamp(
                    positionPercent,
                    0,
                    100
                )}%`;

        }


        // ====================================================
        // LIGHT BALANCE
        // ====================================================

        updateBalance(
            safeLDR1,
            safeLDR2
        );


        // ====================================================
        // HARDWARE HEALTH
        // ====================================================

        updateHealth(
            safeLDR1,
            safeLDR2
        );


        // ====================================================
        // ENVIRONMENT
        // ====================================================

        updateEnvironmentEstimate(
            safeLDR1,
            safeLDR2
        );


        // ====================================================
        // SESSION SUMMARY
        // ====================================================

        updateSessionSummary(
            safeLDR1,
            safeLDR2,
            difference,
            safePanelAngle,
            safeRawAngle,
            direction
        );


        // ====================================================
        // CSV LOGGING
        // ====================================================

        maybeLogCsvSample(
            safeLDR1,
            safeLDR2,
            safePanelAngle,
            safeRawAngle,
            difference,
            direction
        );


        // ====================================================
        // LIVE GRAPH HISTORY
        // ====================================================

        const now =
            new Date();


        historyData.push({

            time:
                getLocalTime(
                    now
                ),

            timestamp:
                now.getTime(),

            ldr1:
                Math.round(
                    safeLDR1
                ),

            ldr2:
                Math.round(
                    safeLDR2
                ),

            difference:
                Math.round(
                    difference
                ),

            panel:
                Math.round(
                    safePanelAngle
                ),

            raw:
                Math.round(
                    safeRawAngle
                ),

            power:
                currentPower.power_W

        });


        if (
            historyData.length >
            MAX_HISTORY
        ) {

            historyData.shift();

        }


        // Counters

        setText(
            sampleCount,
            `${csvData.length} samples`
        );


        setText(
            summaryCsvCount,
            csvData.length
        );


        drawCharts();

    }
);


// ============================================================
// SUN ARC
// ============================================================

function updateSunPosition(
    angle
) {

    if (
        !solarScene ||
        !sun
    ) {

        return;

    }


    const sceneWidth =
        solarScene.clientWidth;


    const sceneHeight =
        solarScene.clientHeight;


    if (
        sceneWidth <= 0 ||
        sceneHeight <= 0
    ) {

        return;

    }


    const radians =
        angle *
        Math.PI /
        180;


    const radius =
        Math.min(
            sceneWidth *
                0.42,

            sceneHeight *
                0.80
        );


    const centerX =
        sceneWidth /
        2;


    const centerY =
        sceneHeight *
        0.98;


    const sunX =
        Math.sin(
            radians
        ) *
        radius;


    const sunY =
        Math.cos(
            radians
        ) *
        radius;


    const sunLeft =
        centerX +
        sunX;


    const sunTop =
        centerY -
        sunY;


    sun.style.left =
        `${(
            sunLeft /
            sceneWidth
        ) * 100}%`;


    sun.style.top =
        `${(
            sunTop /
            sceneHeight
        ) * 100}%`;

}


// ============================================================
// LIGHT BALANCE
// ============================================================

function updateBalance(
    ldr1,
    ldr2
) {

    const difference =
        Math.abs(
            ldr1 -
            ldr2
        );


    const balance =
        clamp(
            100 -
            (
                difference /
                1023
            ) *
            100,
            0,
            100
        );


    const rounded =
        Math.round(
            balance
        );


    setText(
        balanceScore,
        `${rounded}%`
    );


    if (balanceFill) {

        balanceFill.style.width =
            `${rounded}%`;

    }

}


// ============================================================
// HARDWARE HEALTH
// ============================================================

function updateHealth(
    ldr1,
    ldr2
) {

    setText(
        arduinoHealth,
        "● Connected"
    );


    if (arduinoHealth) {

        arduinoHealth.style.color =
            "#55e69a";

    }


    if (
        ldr1 <= 1
    ) {

        setText(
            ldr1Health,
            "● Check"
        );


        if (ldr1Health) {

            ldr1Health.style.color =
                "#ff6b6b";

        }

    }

    else {

        setText(
            ldr1Health,
            "● Working"
        );


        if (ldr1Health) {

            ldr1Health.style.color =
                "#55e69a";

        }

    }


    if (
        ldr2 <= 1
    ) {

        setText(
            ldr2Health,
            "● Check"
        );


        if (ldr2Health) {

            ldr2Health.style.color =
                "#ff6b6b";

        }

    }

    else {

        setText(
            ldr2Health,
            "● Working"
        );


        if (ldr2Health) {

            ldr2Health.style.color =
                "#55e69a";

        }

    }


    setText(
        servoHealth,
        "● Ready"
    );


    if (servoHealth) {

        servoHealth.style.color =
            "#55e69a";

    }

}


// ============================================================
// ENVIRONMENT ESTIMATE
// ============================================================

function updateEnvironmentEstimate(
    ldr1,
    ldr2
) {

    const average =
        (
            ldr1 +
            ldr2
        ) /
        2;


    const brightness =
        (
            average /
            1023
        ) *
        100;


    environmentSamples.push({

        average:
            average,

        timestamp:
            Date.now()

    });


    if (
        environmentSamples.length >
        MAX_ENVIRONMENT_SAMPLES
    ) {

        environmentSamples.shift();

    }


    const stability =
        calculateLightStability();


    const condition =
        classifySkyCondition(
            brightness,
            stability
        );


    currentEnvironment = {

        icon:
            condition.icon,

        label:
            condition.label,

        confidence:
            condition.confidence,

        explanation:
            condition.explanation,

        average:
            average,

        brightness:
            brightness,

        stability:
            stability

    };


    setText(
        averageLDR,
        Math.round(
            average
        )
    );


    setText(
        ambientBrightness,
        `${Math.round(
            brightness
        )}%`
    );


    setText(
        weatherStability,
        `${Math.round(
            stability
        )}%`
    );


    setText(
        weatherDifference,
        Math.round(
            Math.abs(
                ldr1 -
                ldr2
            )
        )
    );


    if (ambientFill) {

        ambientFill.style.width =
            `${clamp(
                brightness,
                0,
                100
            )}%`;

    }


    setText(
        skyIcon,
        condition.icon
    );


    setText(
        skyCondition,
        condition.label
    );


    setText(
        weatherConfidence,
        condition.confidence
    );


    setText(
        weatherExplanation,
        condition.explanation
    );

}


// ============================================================
// SKY CLASSIFICATION
// ============================================================

function classifySkyCondition(
    brightness,
    stability
) {

    const stabilityText =
        stability >= 70
            ? "Sensor estimate"
            : "Changing light";


    if (
        brightness <
        10
    ) {

        return {

            icon:
                "🌙",

            label:
                "Very Dark",

            confidence:
                stability >= 70
                    ? "Stable reading"
                    : "Changing light",

            explanation:
                "Very low ambient light detected. This usually indicates night, deep shade, or a very dark environment."

        };

    }


    if (
        brightness <
        28
    ) {

        return {

            icon:
                "☁",

            label:
                "Overcast / Low Light",

            confidence:
                stabilityText,

            explanation:
                "Low ambient brightness detected. Cloud cover, shade, or other conditions may be reducing available light."

        };

    }


    if (
        brightness <
        48
    ) {

        return {

            icon:
                "☁️",

            label:
                "Cloudy",

            confidence:
                stabilityText,

            explanation:
                "Moderate-to-low ambient brightness detected. The system classifies this as a cloudy-light condition."

        };

    }


    if (
        brightness <
        70
    ) {

        return {

            icon:
                "⛅",

            label:
                "Partly Cloudy",

            confidence:
                stabilityText,

            explanation:
                "Intermediate ambient brightness detected. This can occur when sunlight is filtered by clouds or partial shade."

        };

    }


    return {

        icon:
            "☀️",

        label:
            "Sunny / Bright",

        confidence:
            stabilityText,

        explanation:
            "High ambient brightness detected. The LDR sensors are receiving strong light."

    };

}


// ============================================================
// LIGHT STABILITY
// ============================================================

function calculateLightStability() {

    if (
        environmentSamples.length <
        2
    ) {

        return 100;

    }


    const values =
        environmentSamples.map(
            sample =>
                sample.average
        );


    const mean =
        values.reduce(
            (
                sum,
                value
            ) =>
                sum +
                value,
            0
        ) /
        values.length;


    const variance =
        values.reduce(
            (
                sum,
                value
            ) =>
                sum +
                Math.pow(
                    value -
                    mean,
                    2
                ),
            0
        ) /
        values.length;


    const standardDeviation =
        Math.sqrt(
            variance
        );


    const normalizedVariation =
        (
            standardDeviation /
            1023
        ) *
        100;


    return clamp(
        100 -
        (
            normalizedVariation *
            4
        ),
        0,
        100
    );

}


// ============================================================
// SESSION SUMMARY
// ============================================================

function updateSessionSummary(
    ldr1,
    ldr2,
    difference,
    panelAngle,
    rawAngle,
    direction
) {

    const now =
        new Date();


    const balance =
        clamp(
            100 -
            (
                Math.abs(
                    difference
                ) /
                1023
            ) *
            100,
            0,
            100
        );


    setText(
        summaryDate,
        getLocalDate(
            now
        )
    );


    setText(
        summaryTime,
        getLocalTime(
            now
        )
    );


    setText(
        summaryDay,
        getDayName(
            now
        )
    );


    setText(
        summarySkyCondition,
        currentEnvironment.label
    );


    setText(
        summaryWeatherSource,
        "LDR sensor estimate"
    );


    setText(
        summaryWeatherConfidence,
        currentEnvironment.confidence
    );


    setText(
        summaryAmbientBrightness,
        `${Math.round(
            currentEnvironment.brightness
        )}%`
    );


    setText(
        summaryAverageLDR,
        Math.round(
            currentEnvironment.average
        )
    );


    setText(
        summaryLDR1,
        Math.round(
            ldr1
        )
    );


    setText(
        summaryLDR2,
        Math.round(
            ldr2
        )
    );


    setText(
        summaryDifference,
        Math.round(
            difference
        )
    );


    setText(
        summaryBalance,
        `${Math.round(
            balance
        )}%`
    );


    setText(
        summaryStability,
        `${Math.round(
            currentEnvironment.stability
        )}%`
    );


    setText(
        summaryPanelAngle,
        `${Math.round(
            panelAngle
        )}°`
    );


    setText(
        summaryRawServo,
        `${Math.round(
            rawAngle
        )}°`
    );


    setText(
        summaryDirection,
        direction
    );


    setText(
        summaryMode,
        currentMode
    );


    setText(
        summaryTrackingStatus,
        trackingMessage
            ? trackingMessage.textContent
            : "—"
    );


    setText(
        summaryVoltage,
        formatVoltage(
            currentPower.voltage
        )
    );


    setText(
        summaryCurrent,
        formatCurrent(
            currentPower.current_mA
        )
    );


    setText(
        summaryPower,
        formatPower(
            currentPower.power_W
        )
    );


    setText(
        summaryEnergy,
        formatEnergy(
            sessionEnergyWh
        )
    );


    setText(
        summaryCsvCount,
        csvData.length
    );


    setText(
        summaryStatus,
        csvData.length > 0
            ? "LOGGING"
            : "LIVE"
    );

    if (summaryBrightnessBar) {

    summaryBrightnessBar.style.width =
        `${clamp(
            currentEnvironment.brightness,
            0,
            100
        )}%`;

}


if (summaryBalanceBar) {

    summaryBalanceBar.style.width =
        `${clamp(
            balance,
            0,
            100
        )}%`;

}


if (summaryStabilityBar) {

    summaryStabilityBar.style.width =
        `${clamp(
            currentEnvironment.stability,
            0,
            100
        )}%`;

}

}


// ============================================================
// 30-SECOND CSV LOGGER
// ============================================================

function maybeLogCsvSample(
    ldr1,
    ldr2,
    panelAngle,
    rawAngle,
    difference,
    direction
) {

    const now =
        new Date();


    const nowMs =
        now.getTime();


    if (
        csvData.length > 0 &&
        (
            nowMs -
            lastCsvSampleTime
        ) <
        CSV_INTERVAL_MS
    ) {

        return;

    }


    const balance =
        clamp(
            100 -
            (
                Math.abs(
                    difference
                ) /
                1023
            ) *
            100,
            0,
            100
        );


    csvData.push({

        date:
            getCsvDate(
                now
            ),

        time:
            getLocalTime(
                now
            ),

        day:
            getDayName(
                now
            ),

        skyCondition:
            currentEnvironment.label,

        weatherSource:
            "LDR sensor estimate",

        weatherConfidence:
            currentEnvironment.confidence,

        ambientBrightness:
            Number(
                currentEnvironment.brightness
                    .toFixed(
                        1
                    )
            ),

        averageLDR:
            Math.round(
                currentEnvironment.average
            ),

        ldr1:
            Math.round(
                ldr1
            ),

        ldr2:
            Math.round(
                ldr2
            ),

        lightDifference:
            Math.round(
                difference
            ),

        lightBalance:
            Math.round(
                balance
            ),

        lightStability:
            Math.round(
                currentEnvironment.stability
            ),

        panelAngle:
            Math.round(
                panelAngle
            ),

        rawServo:
            Math.round(
                rawAngle
            ),

        direction:
            direction,

        mode:
            currentMode,

        trackingStatus:
            trackingMessage
                ? trackingMessage.textContent
                : "",

        voltage:
            Number(
                currentPower.voltage.toFixed(
                    3
                )
            ),

        current:
            Number(
                currentPower.current_mA.toFixed(
                    3
                )
            ),

        power:
            Number(
                currentPower.power_W.toFixed(
                    6
                )
            ),

        energy:
            Number(
                sessionEnergyWh.toFixed(
                    6
                )
            )

    });


    lastCsvSampleTime =
        nowMs;


    setText(
        sampleCount,
        `${csvData.length} samples`
    );


    setText(
        summaryCsvCount,
        csvData.length
    );


    setText(
        summaryStatus,
        "LOGGING"
    );

}


// ============================================================
// CSV ESCAPE
// ============================================================

function csvEscape(
    value
) {

    const text =
        (
            value === null ||
            value === undefined
        )
            ? ""
            : String(
                value
            );


    if (
        text.includes(",") ||
        text.includes('"') ||
        text.includes("\n") ||
        text.includes("\r")
    ) {

        return `"${text.replaceAll(
            '"',
            '""'
        )}"`;

    }


    return text;

}


// ============================================================
// CSV EXPORT
// ============================================================

if (downloadCSV) {

    downloadCSV.addEventListener(
        "click",
        () => {

            if (
                csvData.length === 0
            ) {

                alert(
                    "No 30-second session data available yet."
                );

                return;

            }


            const headers = [

                "Date",
                "Time",
                "Day",
                "Sky Condition Estimate",
                "Weather Data Source",
                "Weather Confidence",
                "Ambient Brightness %",
                "Average LDR",
                "LDR 1",
                "LDR 2",
                "Light Difference",
                "Light Balance %",
                "Light Stability %",
                "Panel Angle °",
                "Raw Servo °",
                "Tracking Direction",
                "Mode",
                "Tracking Status",
                "Panel Voltage V",
                "Panel Current mA",
                "Output Power W",
                "Session Energy Wh"

            ];


            const rows =
                [
                    headers
                ];


            csvData.forEach(
                row => {

                    rows.push([

                        row.date,

                        row.time,

                        row.day,

                        row.skyCondition,

                        row.weatherSource,

                        row.weatherConfidence,

                        row.ambientBrightness,

                        row.averageLDR,

                        row.ldr1,

                        row.ldr2,

                        row.lightDifference,

                        row.lightBalance,

                        row.lightStability,

                        row.panelAngle,

                        row.rawServo,

                        row.direction,

                        row.mode,

                        row.trackingStatus,

                        row.voltage,

                        row.current,

                        row.power,

                        row.energy

                    ]);

                }
            );


            const csv =
                rows
                    .map(
                        row =>
                            row
                                .map(
                                    csvEscape
                                )
                                .join(
                                    ","
                                )
                    )
                    .join(
                        "\r\n"
                    ) +
                "\r\n";


            const blob =
                new Blob(
                    [
                        "\uFEFF",
                        csv
                    ],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "solar_tracker_30s_session.csv";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            URL.revokeObjectURL(
                url
            );

        }
    );

}


// ============================================================
// CLEAR HISTORY
// ============================================================

if (clearHistory) {

    clearHistory.addEventListener(
        "click",
        () => {

            historyData = [];

            csvData = [];

            environmentSamples = [];

            sessionEnergyWh = 0;

            lastPowerTimestamp = 0;

            lastCsvSampleTime = 0;


            currentPower = {

                voltage: 0,

                current_mA: 0,

                power_W: 0

            };


            currentEnvironment = {

                icon: "☀",

                label:
                    "Waiting for sensor data",

                confidence: "—",

                explanation:
                    "Waiting for sufficient LDR readings...",

                average: 0,

                brightness: 0,

                stability: 100

            };


            setText(
                sampleCount,
                "0 samples"
            );


            setText(
                summaryCsvCount,
                "0"
            );


            setText(
                summaryStatus,
                "LIVE"
            );


            setText(
                powerVoltageElement,
                "0.000 V"
            );


            setText(
                powerCurrentElement,
                "0.000 mA"
            );


            setText(
                powerOutputElement,
                "0.000 mW"
            );


            setText(
                powerEnergyElement,
                "0.000 mWh"
            );


            setText(
                powerGraphValue,
                "0.000 mW"
            );


            setText(
                summaryVoltage,
                "0.000 V"
            );


            setText(
                summaryCurrent,
                "0.000 mA"
            );


            setText(
                summaryPower,
                "0.000 mW"
            );


            setText(
                summaryEnergy,
                "0.000 mWh"
            );


            setText(
                averageLDR,
                "0"
            );


            setText(
                ambientBrightness,
                "0%"
            );


            setText(
                weatherStability,
                "—"
            );


            setText(
                weatherDifference,
                "0"
            );


            setText(
                skyIcon,
                "☀"
            );


            setText(
                skyCondition,
                "Waiting for sensor data"
            );


            setText(
                weatherConfidence,
                "—"
            );


            setText(
                weatherExplanation,
                "Waiting for sufficient LDR readings..."
            );


            if (ambientFill) {

                ambientFill.style.width =
                    "0%";

            }


            const now =
                new Date();


            setText(
                summaryDate,
                getLocalDate(
                    now
                )
            );


            setText(
                summaryTime,
                getLocalTime(
                    now
                )
            );


            setText(
                summaryDay,
                getDayName(
                    now
                )
            );


            setText(
                summarySkyCondition,
                "Waiting..."
            );


            setText(
                summaryWeatherSource,
                "LDR sensor estimate"
            );


            setText(
                summaryWeatherConfidence,
                "—"
            );


            setText(
                summaryAmbientBrightness,
                "0%"
            );


            setText(
                summaryAverageLDR,
                "0"
            );


            setText(
                summaryLDR1,
                "0"
            );


            setText(
                summaryLDR2,
                "0"
            );


            setText(
                summaryDifference,
                "0"
            );


            setText(
                summaryBalance,
                "0%"
            );


            setText(
                summaryStability,
                "0%"
            );


            setText(
                summaryPanelAngle,
                "0°"
            );


            setText(
                summaryRawServo,
                "0°"
            );


            setText(
                summaryDirection,
                "CENTER"
            );


            setText(
                summaryMode,
                currentMode
            );


            setText(
                summaryTrackingStatus,
                "Waiting for Arduino..."
            );


            drawCharts();

        }
    );

}


// ============================================================
// SUNDIAL CLOCK
// ============================================================

function updateSundialClock() {

    const now =
        new Date();


    const hours =
        now.getHours();

    const minutes =
        now.getMinutes();

    const seconds =
        now.getSeconds();


    const timeString =
        [

            String(
                hours
            ).padStart(
                2,
                "0"
            ),

            String(
                minutes
            ).padStart(
                2,
                "0"
            ),

            String(
                seconds
            ).padStart(
                2,
                "0"
            )

        ].join(
            ":"
        );


    const dateString =
        now.toLocaleDateString(
            undefined,
            {

                weekday:
                    "long",

                day:
                    "numeric",

                month:
                    "long",

                year:
                    "numeric"

            }
        );


    setText(
        realTimeElement,
        timeString
    );


    setText(
        realDateElement,
        dateString
    );


    setText(
        summaryDate,
        getLocalDate(
            now
        )
    );


    setText(
        summaryTime,
        getLocalTime(
            now
        )
    );


    setText(
        summaryDay,
        getDayName(
            now
        )
    );


    updateSundialShadow(
        now
    );

}


function updateSundialShadow(
    now
) {

    if (!sundialShadow) {

        return;

    }


    const hours =
        now.getHours();

    const minutes =
        now.getMinutes();

    const seconds =
        now.getSeconds();


    const totalSeconds =
        hours *
            3600 +
        minutes *
            60 +
        seconds;


    // Graphical 12-hour representation

    const twelveHourSeconds =
        totalSeconds %
        43200;


    const progress =
        twelveHourSeconds /
        43200;


    const shadowAngle =
        progress *
        360;


    sundialShadow.style.setProperty(
        "--shadow-angle",
        `${shadowAngle}deg`
    );


    sundialShadow.style.transform =
        `translate(
            -50%,
            -100%
        )
        rotate(
            ${shadowAngle}deg
        )`;

}


updateSundialClock();


setInterval(
    updateSundialClock,
    1000
);


// ============================================================
// CANVAS SETUP
// ============================================================

function prepareCanvas(
    canvas
) {

    if (!canvas) {

        return null;

    }


    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;


    if (
        width <= 0 ||
        height <= 0
    ) {

        return null;

    }


    const dpr =
        window.devicePixelRatio ||
        1;


    canvas.width =
        Math.round(
            width *
            dpr
        );


    canvas.height =
        Math.round(
            height *
            dpr
        );


    const ctx =
        canvas.getContext(
            "2d"
        );


    if (!ctx) {

        return null;

    }


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    return {

        ctx:
            ctx,

        width:
            width,

        height:
            height

    };

}


// ============================================================
// CHART COLORS
// ============================================================

function getChartColors() {

    const lightMode =
        document.body.classList.contains(
            "light-theme"
        );


    return {

        grid:
            lightMode
                ? "#d7dee8"
                : "#1d2a3d",

        angle:
            lightMode
                ? "#b58d00"
                : "#e8c85a",

        ldr1:
            lightMode
                ? "#b58d00"
                : "#e8c85a",

        ldr2:
            lightMode
                ? "#2d77c7"
                : "#5ca8ff",

        power:
            lightMode
                ? "#2f8f63"
                : "#55e69a"

    };

}


// ============================================================
// CHART GRID
// ============================================================

function drawChartGrid(
    ctx,
    width,
    height
) {

    const colors =
        getChartColors();


    ctx.strokeStyle =
        colors.grid;


    ctx.lineWidth =
        1;


    for (
        let i = 0;
        i <= 4;
        i++
    ) {

        const y =
            (
                height /
                4
            ) *
            i +
            0.5;


        ctx.beginPath();


        ctx.moveTo(
            0,
            y
        );


        ctx.lineTo(
            width,
            y
        );


        ctx.stroke();

    }


    for (
        let i = 0;
        i <= 5;
        i++
    ) {

        const x =
            (
                width /
                5
            ) *
            i +
            0.5;


        ctx.beginPath();


        ctx.moveTo(
            x,
            0
        );


        ctx.lineTo(
            x,
            height
        );


        ctx.stroke();

    }

}


// ============================================================
// DRAW LINE
// ============================================================

function drawLine(
    ctx,
    values,
    min,
    max,
    width,
    height,
    color,
    lineWidth = 2
) {

    if (
        values.length <
        2
    ) {

        return;

    }


    ctx.strokeStyle =
        color;


    ctx.lineWidth =
        lineWidth;


    ctx.lineJoin =
        "round";


    ctx.lineCap =
        "round";


    ctx.beginPath();


    values.forEach(
        (
            value,
            index
        ) => {

            const x =
                (
                    index /
                    (
                        values.length -
                        1
                    )
                ) *
                width;


            const normalized =
                clamp(
                    (
                        value -
                        min
                    ) /
                    (
                        max -
                        min
                    ),
                    0,
                    1
                );


            const y =
                height -
                (
                    normalized *
                    height
                );


            if (
                index ===
                0
            ) {

                ctx.moveTo(
                    x,
                    y
                );

            }

            else {

                ctx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    ctx.stroke();

}


// ============================================================
// LATEST POINT
// ============================================================

function drawLatestPoint(
    ctx,
    value,
    min,
    max,
    width,
    height,
    color
) {

    if (
        historyData.length ===
        0
    ) {

        return;

    }


    const normalized =
        clamp(
            (
                value -
                min
            ) /
            (
                max -
                min
            ),
            0,
            1
        );


    const x =
        width;


    const y =
        height -
        (
            normalized *
            height
        );


    ctx.fillStyle =
        color;


    ctx.beginPath();


    ctx.arc(
        x,
        y,
        4,
        0,
        Math.PI * 2
    );


    ctx.fill();

}


// ============================================================
// PANEL ANGLE GRAPH
// ============================================================

function drawAngleChart() {

    const prepared =
        prepareCanvas(
            angleCanvas
        );


    if (!prepared) {

        return;

    }


    const {
        ctx,
        width,
        height
    } =
        prepared;


    const colors =
        getChartColors();


    drawChartGrid(
        ctx,
        width,
        height
    );


    if (
        historyData.length <
        2
    ) {

        return;

    }


    const values =
        historyData.map(
            item =>
                item.panel
        );


    drawLine(
        ctx,
        values,
        -90,
        90,
        width,
        height,
        colors.angle,
        2.5
    );


    drawLatestPoint(
        ctx,
        values[
            values.length -
            1
        ],
        -90,
        90,
        width,
        height,
        colors.angle
    );

}


// ============================================================
// LDR GRAPH
// ============================================================

function drawLDRChart() {

    const prepared =
        prepareCanvas(
            ldrCanvas
        );


    if (!prepared) {

        return;

    }


    const {
        ctx,
        width,
        height
    } =
        prepared;


    const colors =
        getChartColors();


    drawChartGrid(
        ctx,
        width,
        height
    );


    if (
        historyData.length <
        2
    ) {

        return;

    }


    const ldr1Values =
        historyData.map(
            item =>
                item.ldr1
        );


    const ldr2Values =
        historyData.map(
            item =>
                item.ldr2
        );


    drawLine(
        ctx,
        ldr1Values,
        0,
        1023,
        width,
        height,
        colors.ldr1,
        2.25
    );


    drawLine(
        ctx,
        ldr2Values,
        0,
        1023,
        width,
        height,
        colors.ldr2,
        2.25
    );


    drawLatestPoint(
        ctx,
        ldr1Values[
            ldr1Values.length -
            1
        ],
        0,
        1023,
        width,
        height,
        colors.ldr1
    );


    drawLatestPoint(
        ctx,
        ldr2Values[
            ldr2Values.length -
            1
        ],
        0,
        1023,
        width,
        height,
        colors.ldr2
    );

}


// ============================================================
// POWER GRAPH
// ============================================================

function drawPowerChart() {

    const prepared =
        prepareCanvas(
            powerCanvas
        );


    if (!prepared) {

        return;

    }


    const {
        ctx,
        width,
        height
    } =
        prepared;


    const colors =
        getChartColors();


    drawChartGrid(
        ctx,
        width,
        height
    );


    if (
        historyData.length <
        2
    ) {

        return;

    }


    const values =
        historyData.map(
            item =>
                Math.max(
                    0,
                    Number(
                        item.power || 0
                    )
                )
        );


    let maxValue =
        Math.max(
            ...values,
            0.001
        );


    maxValue *= 1.2;


    const exponent =
        Math.floor(
            Math.log10(
                maxValue
            )
        );


    const magnitude =
        Math.pow(
            10,
            exponent
        );


    maxValue =
        Math.ceil(
            maxValue /
            magnitude
        ) *
        magnitude;


    drawLine(
        ctx,
        values,
        0,
        maxValue,
        width,
        height,
        colors.power,
        2.5
    );


    drawLatestPoint(
        ctx,
        values[
            values.length -
            1
        ],
        0,
        maxValue,
        width,
        height,
        colors.power
    );

}


// ============================================================
// DRAW ALL CHARTS
// ============================================================

function drawCharts() {

    drawAngleChart();

    drawLDRChart();

    drawPowerChart();

}


// ============================================================
// THEME
// ============================================================

function applyTheme(
    isLight
) {

    if (isLight) {

        document.body.classList.add(
            "light-theme"
        );


        setText(
            themeIcon,
            "☀"
        );


        setText(
            themeText,
            "Light"
        );

    }

    else {

        document.body.classList.remove(
            "light-theme"
        );


        setText(
            themeIcon,
            "☾"
        );


        setText(
            themeText,
            "Dark"
        );

    }


    drawCharts();

}


const savedTheme =
    localStorage.getItem(
        "solarTrackerTheme"
    );


if (
    savedTheme ===
    "light"
) {

    applyTheme(
        true
    );

}

else {

    applyTheme(
        false
    );

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentlyLight =
                document.body.classList.contains(
                    "light-theme"
                );


            const newLightMode =
                !currentlyLight;


            applyTheme(
                newLightMode
            );


            localStorage.setItem(
                "solarTrackerTheme",
                newLightMode
                    ? "light"
                    : "dark"
            );

        }
    );

}


// ============================================================
// INITIAL STATE
// ============================================================

if (manualAngle) {

    manualAngle.disabled =
        true;

}


setText(
    manualAngleValue,
    "0°"
);


setText(
    angleGraphValue,
    "0°"
);


setText(
    powerVoltageElement,
    "0.000 V"
);


setText(
    powerCurrentElement,
    "0.000 mA"
);


setText(
    powerOutputElement,
    "0.000 mW"
);


setText(
    powerEnergyElement,
    "0.000 mWh"
);


setText(
    powerGraphValue,
    "0.000 mW"
);


setText(
    summaryVoltage,
    "0.000 V"
);


setText(
    summaryCurrent,
    "0.000 mA"
);


setText(
    summaryPower,
    "0.000 mW"
);


setText(
    summaryEnergy,
    "0.000 mWh"
);


setText(
    summaryCsvCount,
    "0"
);


setText(
    summaryStatus,
    "LIVE"
);


setText(
    sampleCount,
    "0 samples"
);


const initialNow =
    new Date();


setText(
    realTimeElement,
    getLocalTime(
        initialNow
    )
);


setText(
    realDateElement,
    initialNow.toLocaleDateString(
        undefined,
        {
            weekday:
                "long",

            day:
                "numeric",

            month:
                "long",

            year:
                "numeric"
        }
    )
);


setText(
    summaryDate,
    getLocalDate(
        initialNow
    )
);


setText(
    summaryTime,
    getLocalTime(
        initialNow
    )
);


setText(
    summaryDay,
    getDayName(
        initialNow
    )
);


// ============================================================
// INITIAL CHART RENDER
// ============================================================

updateSundialClock();

drawCharts();


// ============================================================
// RESIZE HANDLER
// ============================================================

window.addEventListener(
    "resize",
    () => {

        drawCharts();

    }
);