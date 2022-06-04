module.exports = function (app, workerObj,
    timeOutInterval, timeOutIntervalMinutes) {
    const timeManager = require("./timerManager")(
        workerObj, timeOutIntervalMinutes
    );

    app.post("/camera/startCapture", (req, res) => {
        if (workerObj != null) {
            if (workerObj.estado == "Taking Pictures")
                timeManager.resetRes(res);
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
        timeManager.resetRes(res);
    });

    app.post("/camera/stopCapture", (req, res) => {
        if (workerObj != null) {
            if (workerObj.estado == "Taking Pictures") {
                console.log("Stopping Capture...")
                workerObj.worker.postMessage({ data: "stopCapture" });
                workerObj.worker.estado = "Idle";
            }
        }
        res.send("Capture Stopped");
    });

    app.post("/camera/startStream", (req, res) => {
        console.log(workerObj.estado);

        workerObj.worker.postMessage({ data: "startStream", timeOutInterval: timeOutInterval })
        res.send("Stream Started")
    });

    app.post("/camera/stopStream", (req, res) => {
        console.log(workerObj.estado);

        workerObj.worker.postMessage({ data: "stopStream", timeOutInterval: timeOutInterval })
        res.send("Stream Stopped")
    })
}