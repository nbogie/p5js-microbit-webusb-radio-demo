input.onButtonPressed(Button.A, function () {
    radio.sendString("bA")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("bAB")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("bB")
})
basic.showIcon(IconNames.SmallHeart)
radio.setGroup(66)
basic.forever(function () {
    radio.sendValue("rotZ", input.rotation(Rotation.Roll))
    basic.pause(5)
    radio.sendValue("rotX", input.rotation(Rotation.Pitch))
    basic.pause(5)
    radio.sendValue("light", input.lightLevel())
    basic.pause(40)
    led.toggle(0, 0)
})
