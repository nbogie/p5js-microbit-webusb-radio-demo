radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    led.toggle(3, 0)
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
    led.toggle(4, 0)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    str = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (str == "Test") {
        led.toggle(0, 0)
    }
    if (str.substr(0, 2) == "mx") {
        led.toggle(1, 0)
        mxValStr = str.split("=")[1]
        ledIx = Math.round(parseFloat(mxValStr) * 4)
        led.toggle(ledIx, 4)
    }
    serial.writeLine("echo " + str)
})
let ledIx = 0
let mxValStr = ""
let str = ""
radio.setGroup(66)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
	
})
