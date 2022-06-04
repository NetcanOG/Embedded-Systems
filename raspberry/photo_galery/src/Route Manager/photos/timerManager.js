var workerObj = null;
var timeOutIntervalMinutes;
module.exports = function (workerObj,timeOutIntervalMinutes) {
    this.workerObj = workerObj;
    this.timeOutIntervalMinutes = timeOutIntervalMinutes;
}

var interval;
module.exports.reset = function resetTimer() {
    console.log("Resetting " + timeOutIntervalMinutes + "minute Capture Timer...")
    clearInterval(interval);
    interval = setInterval(function () {
        if (workerObj != null) {
            workerObj.worker.postMessage({ data: "stopCapture" });
            workerObj.worker.estado = "Idle";
        }
        clearInterval(interval);
    }, timeOutIntervalMinutes * 60 * 1000);
}

module.exports.resetRes = function resetTimerRes(res) {
    resetTimer();
    res.send("Timer Reset");
}
