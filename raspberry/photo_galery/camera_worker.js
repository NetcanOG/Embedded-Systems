const { parentPort, workerData } = require("worker_threads");

// Computer camera setting bellow
{
    const NodeWebcam = require("node-webcam");
    var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 1,
    saveShots: true,
    output: "jpeg",
    
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
var Webcam = NodeWebcam.create( opts );
}

var pictureId = 0;
function takePicture(){
    Webcam.capture("./photos/" + pictureId + ".jpeg", function( err, data ) {} );
    pictureId += 1;
    console.log("Picture Taken by Worker!")
}

var interval;
parentPort.on("message", function(msg){
    parentPort.postMessage(msg)
    let message = msg.data;
    let timeOutInterval = msg.timeOutInterval * 1000;

    if(message == "takePicture")
        interval = setInterval(function () {
            parentPort.postMessage('Picture Taken!');
            takePicture();
        }, timeOutInterval);
    else{
        clearInterval(interval);
    }
})
