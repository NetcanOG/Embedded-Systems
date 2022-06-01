const { parentPort, workerData } = require("worker_threads");

const fileType = "png"
// Firebase
{
    const { initializeApp } = require("firebase/app");
    const { getStorage, ref, uploadBytes } = require("firebase/storage");
    const fs = require("fs");

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyApxRfbs6ESwc-g_FVIk7AjznWV0AxG8WY",
        authDomain: "doorbell-76f1f.firebaseapp.com",
        projectId: "doorbell-76f1f",
        storageBucket: "doorbell-76f1f.appspot.com",
        messagingSenderId: "718748135646",
        appId: "1:718748135646:web:b2487753e716f76a6f524f"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    var storage = getStorage(app);

    function storeFireBase() {
        let time = Date.now().toString();
        // Create a reference to 'mountains.jpg'
        const imageRef = ref(storage, time + "." + fileType);

        // Create a reference to 'images/mountains.jpg'
        const fullImageRef = ref(storage, 'photos/' + time + "." + fileType);

        // 'file' comes from the Blob or File API
        uploadBytes(imageRef, fs.readFileSync('./photos/1.jpeg'))
            .then((snapshot) => {
                console.log(snapshot);
            });
    }
}


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

function takePicture() {
    //let time = Date.now().toString()
    //Webcam.capture("./photos/" + time + "." + fileType, function (err, data) { });
    parentPort.postMessage("take photo")
    console.log("Picture Taken by Worker!")
}

var interval;
parentPort.on("message", function (msg) {
    parentPort.postMessage(msg)
    let message = msg.data;
    let timeOutInterval = msg.timeOutInterval * 1000;

    if (message == "startCapture") {
        clearInterval(interval);
        interval = setInterval(function () {
            takePicture();
        }, timeOutInterval);
    }
    else {
        clearInterval(interval);
    }
})
