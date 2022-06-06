const { parentPort, workerData } = require("worker_threads");

const fileType = "png"

// Computer camera settings bellow
{
    const NodeWebcam = require("node-webcam");
    var opts = {
        width: 720,
        height: 720,
        quality: 100,
        frames: 1,
        saveShots: true,
        output: fileType,

        //Which camera to use
        //Use Webcam.list() for results
        //false for default device
        device: false,

        // [location, buffer, base64]
        // Webcam.CallbackReturnTypes
        callbackReturn: "location",

        //Logging
        verbose: false
    };
    var Webcam = NodeWebcam.create(opts);
}

// Raspberry Pi camera setting bellow
const { spawn } = require("child_process");

function takePicture() {
    spawn("raspistill", ["-vf", "-n", "-e", "png", "-w", "800", "-h", "600", "-o", "../photos/" + Date.now() + "." + fileType]);
    console.log("Picture Taken by Worker!")
}

var interval;
parentPort.on("message", function (msg) {
    // PARA APAGAR OS PRINTS DAS MENSAGEMS -> APAGAR A LINHA DE BAIXO
    parentPort.postMessage(msg)
    let message = msg.data;
    let timeOutInterval = msg.timeOutInterval * 1000;

    switch (message) {
        case "startCapture":
            clearInterval(interval);
            interval = setInterval(function () {
                takePicture();
            }, timeOutInterval);
            break;
        case "startStream":
            parentPort.postMessage("startStream")
            clearInterval(interval);
            interval = setInterval(function (){
                parentPort.postMessage("stopStream")
            }, timeOutInterval * 60)
            break;
        case "stopStream":
            clearInterval(interval);
            parentPort.postMessage("stopStream")
            break;
        default:
            clearInterval(interval);
            break;
    }
});
