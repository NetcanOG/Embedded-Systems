module.exports.startCapture = function (
    res,
    workerObj,
    timeOutInterval,
    timeOutIntervalMinutes,
    timeManager,
) {
    if (workerObj != null) {
        if (workerObj.estado == "Taking Pictures")
            timeManager.resetRes(res, workerObj, timeOutIntervalMinutes);
        else if (workerObj.estado == "Streaming") {
            //can't start capture
            console.log("Streaming. Can't Take Pictures!")
            try { res.send("Streaming. Can't Take Pictures!") } catch { }
        }
        else /* Estado == "Idle" */ {
            console.log("Starting Capture...")
            workerObj.worker.postMessage({ data: "startCapture", timeOutInterval: timeOutInterval })
            workerObj.estado = "Taking Pictures";
            try { res.send("Capture Started"); } catch { }
        }
    }
}

module.exports.resetCaptureTimer = function (
    res,
    workerObj,
    timeOutIntervalMinutes,
    timeManager
) {
    if (workerObj != null)
        if (workerObj.estado == "Taking Pictures")
            timeManager.resetRes(res, workerObj, timeOutIntervalMinutes);
        else try { res.send("Wasn't Taking Pictures.") } catch { }
}

module.exports.stopCapture = function (
    res,
    workerObj,
) {
    if (workerObj != null) {
        if (workerObj.estado == "Taking Pictures") {
            console.log("Stopping Capture...")
            workerObj.worker.postMessage({ data: "stopCapture" });
            workerObj.estado = "Idle";
        }
    }
    try { res.send("Capture Stopped"); } catch { }
}

module.exports.startStream = function (
    res,
    workerObj,
    timeOutIntervalMinutesStream
) {
    if (workerObj != null) {
        if (workerObj.estado == "Taking Pictures") {
            console.log("Stopping Capture...")
            workerObj.worker.postMessage({ data: "stopCapture" });
        }

        console.log(workerObj.estado);
        workerObj.worker.postMessage({ data: "startStream", timeOutInterval: timeOutIntervalMinutesStream })
    }
    try { res.send("Stream Started"); } catch { }
}

module.exports.stopStream = function (
    res,
    workerObj,
) {
    console.log(workerObj.estado);

    workerObj.worker.postMessage({ data: "stopStream" })
    try { res.send("Stream Stopped"); } catch { }
}