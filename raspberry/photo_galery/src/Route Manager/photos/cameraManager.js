module.exports = function (app, workerObj,
    timeOutInterval, timeOutIntervalMinutes) {
    const timeManager = require("./timerManager")(
        workerObj, timeOutIntervalMinutes
    );
    
    app.post("/camera/startCapture", (req, res) => {
        if (workerObj != null) {
            if (workerObj.worker.estado == "Taking Pictures")
                timeManager.resetRes(res);
            else {
                console.log("Starting Capture...")
                workerObj.worker.postMessage({ data: "startCapture", timeOutInterval: timeOutInterval })
                workerObj.worker.estado = "Taking Pictures";
                res.send("Capture Started");
            }
        }
    });

    app.post("/camera/resetCaptureTimer", (req, res) => {
        timeManager.resetRes(res);
    });

    app.post("/camera/stopCapture", (req, res) => {
        if (workerObj != null) {
            console.log("Stopping Capture...")
            workerObj.worker.postMessage({ data: ".." });
            workerObj.worker.estado = "Sleep";
        }
        res.send("Capture Stopped");
    });
}