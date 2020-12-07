# p5js-microbit-webusb-radio-demo
Simple p5js proof-of-concept connecting microbits bidirectionally over radio (bridged) to a p5js sketch via webUSB, thanks to Bill Siever's microbit-webusb code.

Very messy first hack.


# intended architecture

[[microbit "steering wheel"]] <--> [[radio]] <--> [[microbit radio bridge]] <--> [[webUSB to PC]] <--> [[browser running p5.js sketch]] (--> [[interwebs]])

Uses this library by Bill Siever:

https://github.com/bsiever/microbit-webusb


# see also

See also these previous experiments but with serial and p5.serial (not WebUSB):
* microbit control of AFrame on the browser: https://github.com/nbogie/microbit-aframe-example
* big-screen radio messages (for coder dojos, etc): https://github.com/nbogie/microbit-bigscreen-radio-messages
