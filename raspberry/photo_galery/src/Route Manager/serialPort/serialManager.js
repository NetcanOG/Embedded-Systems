var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort({
    path: "/dev/ttyACM0",
    baudRate: 9600,
});
module.exports = function (workerObj) {
    serialPort.on("open", function () {
        serialPort.on('data', function (data) {
            if (data == "M") {
                if (!workerObj.worker.estado == "Taking Pictures") {
                    workerObj.worker.postMessage({ data: "startCapture", timeOutInterval: timeOutInterval })
                    workerObj.worker.estado = "Taking Pictures";
                }
                console.log("Resetting " + timeOutIntervalMinutes + "minute Capture Timer...")
                clearInterval(interval);
                interval = setInterval(function () {
                    if (workerObj != null) {
                        workerObj.worker.postMessage({ data: "stopCapture" });
                        workerObj.worker.estado = "Sleep";
                    }
                    clearInterval(interval);
                }, timeOutIntervalMinutes * 60 * 1000);
            }

        });
    });
}