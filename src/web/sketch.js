
"use strict";
var connectedDevices = [];

let mostRecentData = {};
let xCurrent
let yCurrent

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    xCurrent = width / 2;;
    yCurrent = height / 2;;
}
function draw() {
    background('yellow')
    if (mostRecentData.hasOwnProperty("rotZ")) {
        //both of these sensors actually report -180 to 180
        const destX = map(mostRecentData.rotZ, -90, 90, 0, width);
        //might get garbled string in data.  don't propogate it
        if (!isNaN(mostRecentData.rotZ)) {
            xCurrent = lerp(xCurrent, destX, 0.1);
        }
        if (!isNaN(mostRecentData.rotX)) {
            const destY = map(mostRecentData.rotX, -90, 90, 0, height);
            yCurrent = lerp(yCurrent, destY, 0.1);
        }
        circle(xCurrent, yCurrent, 30);

        if (mouseIsPressed) {

            const msg = "mx=" + (mouseX / width).toFixed(2);
            console.log("sending: ", msg)
            connectedDevices.forEach((d) => uBitSend(d, msg));
        }


        text(JSON.stringify(mostRecentData), 0, 50);
    } else {
        text("awaiting first data from microbit", 20, width / 2);
    }
}

function keyPressed() {
    if (key === "t") {
        console.log("sending test to all", connectedDevices)
        connectedDevices.forEach((d) => uBitSend(d, "Test"));
    }

    if (key === "c") {
        console.log("connecting...");
        uBitConnectDevice(uBitEventHandler);
    }
}



// Example event call-back handler
function uBitEventHandler(reason, device, data) {
    switch (reason) {
        case "connected":
            consolePrintln("<b>Connected!</b>");
            connectedDevices.push(device);
            break;
        case "disconnected":
            consolePrintln("<b>Disconnected</b>");
            connectedDevices = connectedDevices.filter((v) => v != device);
            break;
        case "connection failure":
            consolePrintln("<b>Connection Failure</b>");
            break;
        case "error":
            consolePrintln("<b>Error</b>");
            break;
        case "console":
            consolePrintln("Console Data: " + data.data);
            break;
        case "graph-event":
            // consolePrintln(
            //     `Graph Event:  ${data.data} (for ${data.graph}${data.series.length ? " / series " + data.series : ""
            //     })`
            // );
            break;
        case "graph-data":
            // consolePrintln(`Graph Data: ${data.data} (for ${data.graph}${data.series.length ? " / series " + data.series : ""})`);
            mostRecentData[data.graph] = data.data;
            break;
    }
}

