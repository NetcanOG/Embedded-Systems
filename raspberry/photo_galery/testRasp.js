const { Raspistill } = require("node-raspistill");
const camera = new Raspistill({
    verticalFlip: true,
    width: 800,
    height: 600,
    outputDir: "./photos",
    encoding: "png",
});


var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
    baudrate: 9600
});

serialPort.on("open", function () {
    console.log('open');

    serialPort.on('data', function (data) {
        console.log('data received: ' + data);
    });

    serialPort.write(new Buffer('4', 'ascii'), function (err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
});

function takePhoto(){
    camera.takePhoto().then((photo) => {
        console.log(photo);
    });
}