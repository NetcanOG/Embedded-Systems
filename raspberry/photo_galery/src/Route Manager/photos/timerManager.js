var interval;
module.exports.reset = resetTimer;
function resetTimer(workerObj, timeOutIntervalMinutes) {
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

module.exports.resetRes = function resetTimerRes(res, workerObj, timeOutIntervalMinutes) {
    resetTimer(workerObj, timeOutIntervalMinutes);
    try { res.send("Timer Reset"); } catch { }
}
