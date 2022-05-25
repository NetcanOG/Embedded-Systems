// Photos Webserver
const fs = require('fs');
var express = require('express');
var app = express();

const photo_dir = "photos";
const PORT = 3000;

app.use("/photos", express.static(photo_dir));

/**
 * Send an array of all photos as a
 * response to get requests to "/photos"
 */
const ip = "localhost";
const url = ip + ":3000";
app.get("/photos", (req, res) => {
    let obj = []
    let new_obj = {}
    for (photo_name of fs.readdirSync(photo_dir)) {
        new_obj = {
            img_src: "http://" + url + "/photos/" + photo_name,
        }
        obj.push(new_obj)
    }
    res.send(obj);
});

app.delete("/photos/:fileName", (req, res) => {
    fs.unlink("./photos/" + req.params.fileName, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
    console.log("File DELETED: " + req.params.fileName);
    res.send("File Deleted");
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

var interval;
const workerObj = require("./camera_main").newCameraWorker();
const timeOutInterval = 5;
const timeOutIntervalMinutes = 5;

app.post("/camera/startCapture", (req, res) => {
    if (workerObj != null) {
        console.log("Starting Capture...")
        workerObj.worker.postMessage({ data: "startCapture", timeOutInterval: timeOutInterval })
    }
    res.send("Capture Started");
});

app.post("/camera/resetCaptureTimer", (req, res) => {
    console.log("Resetting " + timeOutIntervalMinutes + "minute Capture Timer...")
    interval = setInterval(function () {
        if (workerObj != null)
            workerObj.worker.postMessage({ data: "stopCapture" });
        clearInterval(interval);
    }, timeOutIntervalMinutes * 60 * 1000);
    res.send("Timer Reset");
});

app.post("/camera/stopCapture", (req, res) => {
    if (workerObj != null) {
        console.log("Stopping Capture...")
        workerObj.worker.postMessage({ data: ".." });
    }
    res.send("Capture Stopped");
});

/* In case you want to test if the singleton works, run this function */
function testSingleton_CameraWorker() {
    console.log(workerObj);
    const workerObj2 = require("./camera_main").newCameraWorker();
    console.log(workerObj2);
}
