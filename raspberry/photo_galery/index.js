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
app.get("/photos", (req, res) => {
    res.send(fs.readdirSync(photo_dir));
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

const workerObj = require("./camera_main").newCameraWorker();
const timeOutInterval = 5;
workerObj.worker.postMessage({ data: "takePicture", timeOutInterval: timeOutInterval })

/* In case you want to test if the singleton works, run this function */
function testSingleton_CameraWorker(){
    console.log(workerObj);
    const workerObj2 = require("./camera_main").newCameraWorker();
    console.log(workerObj2);
}
