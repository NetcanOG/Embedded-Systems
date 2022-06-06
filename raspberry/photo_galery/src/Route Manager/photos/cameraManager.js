module.exports = function (
    app,
    workerObj,
    timeOutInterval,
    timeOutIntervalMinutes,
    timeOutIntervalMinutesStream,
    timeManager,
) {
    const functions = require("./functions");

    app.post("/camera/startCapture", (req, res) => {
        functions.startCapture(res, workerObj, timeOutInterval, timeOutIntervalMinutes, timeManager)
    });

    app.post("/camera/resetCaptureTimer", (req, res) => {
        functions.resetCaptureTimer(res, workerObj, timeOutIntervalMinutes, timeManager)
    });

    app.post("/camera/stopCapture", (req, res) => {
        functions.stopCapture(res, workerObj);
    });

    app.post("/camera/startStream", (req, res) => {
        functions.startStream(res, workerObj, timeOutIntervalMinutesStream);
    });

    app.post("/camera/stopStream", (req, res) => {
        functions.stopStream(res, workerObj);
    });
}