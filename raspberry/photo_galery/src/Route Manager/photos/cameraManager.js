module.exports = function (
    app,
    workerObj,
    timeOutInterval,
    timeOutIntervalMinutes,
    timeOutIntervalMinutesStream) {
    const timeManager = require("./timerManager");

    app.post("/camera/startCapture", (req, res) => {
        if (workerObj != null) {
            if (workerObj.estado == "Taking Pictures")
                timeManager.resetRes(res, workerObj, timeOutIntervalMinutes);
            else if (workerObj.estado == "Streaming") {
                //can't start capture
                console.log("Streaming. Can't Take Pictures!")
                res.send("Streaming. Can't Take Pictures!")
            }
            else /* Estado == "Idle" */ {
                console.log("Starting Capture...")
                workerObj.worker.postMessage({ data: "startCapture", timeOutInterval: timeOutInterval })
                workerObj.estado = "Taking Pictures";
                res.send("Capture Started");
            }
        }
    });

    app.post("/camera/resetCaptureTimer", (req, res) => {
        if (workerObj != null)
            if (workerObj.estado == "Taking Pictures")
                timeManager.resetRes(res, workerObj, timeOutIntervalMinutes);
            else res.send("Wasn't Taking Pictures.")
    });

    app.post("/camera/stopCapture", (req, res) => {
        if (workerObj != null) {
            if (workerObj.estado == "Taking Pictures") {
                console.log("Stopping Capture...")
                workerObj.worker.postMessage({ data: "stopCapture" });
                workerObj.estado = "Idle";
            }
        }
        res.send("Capture Stopped");
    });

    app.post("/camera/startStream", (req, res) => {
        if (workerObj != null) {
            if (workerObj.estado == "Taking Pictures") {
                console.log("Stopping Capture...")
                workerObj.worker.postMessage({ data: "stopCapture" });
            }

            console.log(workerObj.estado);
            workerObj.worker.postMessage({ data: "startStream", timeOutInterval: timeOutIntervalMinutesStream })
        }
        res.send("Stream Started")
    });

    app.post("/camera/stopStream", (req, res) => {
        console.log(workerObj.estado);

        workerObj.worker.postMessage({ data: "stopStream" })
        res.send("Stream Stopped")
    })
}