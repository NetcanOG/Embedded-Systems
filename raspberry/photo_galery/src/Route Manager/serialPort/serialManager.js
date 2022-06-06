var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort({
    path: "/dev/ttyACM0",
    baudRate: 9600,
});
module.exports = function (
    workerObj,
    timeOutInterval,
    timeOutIntervalMinutes,
    timeOutIntervalMinutesStream,
    timeManager,
) {
    const functions = require("../../Route Manager/photos/functions");
    serialPort.on("open", function () {
        serialPort.on('data', function (data) {
            console.log("Buffer: " + data);
            console.log(data.toString().replace(/[\s\r\n]/,'') + "\n++++++++");
            switch (data.toString().replace(/[\s\r\n]/,'')) {
                case "M":
                    functions.startCapture(null, workerObj, timeOutInterval, timeOutIntervalMinutes, timeManager);
                    break;
                case "B":
                    console.log("Devia comercar a stream")
                    functions.startStream(null, workerObj, timeOutIntervalMinutesStream)
                    break;
                default:
                    break;
            }
        });
    });
}