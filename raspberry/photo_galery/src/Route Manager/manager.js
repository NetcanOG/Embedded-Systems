// Photos Webserver
const photo_dir = "../photos";
const PORT = 3000;
const ip = "rasp1.local";
const url = ip + ":" + PORT;
const timeOutInterval = 5;
const timeOutIntervalMinutes = 1;
const timeOutIntervalMinutesStream = 1;

module.exports = function (app) {
    require("./photos/photoManager")(app, photo_dir);

    const workerObj = require("../Camera Operator/camera_object")
        .newCameraWorker();

    require("./photos/cameraManager")(
        app,
        workerObj,
        timeOutInterval,
        timeOutIntervalMinutes,
        timeOutIntervalMinutesStream
    );  

    //TO-DO
    //require("./serialPort/manager")(workerObj);

    /* In case you want to test if the singleton works, run this function */
    function testSingleton_CameraWorker() {
        console.log(workerObj);
        const workerObj2 = require("./Camera Operator/camera_object").newCameraWorker();
        console.log(workerObj2);
    }
}
