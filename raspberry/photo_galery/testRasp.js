const { Raspistill } = require("node-raspistill");

const {spawn} = require("child_process");

var {SerialPort, ReadlineParser} = require("serialport");
var serialPort = new SerialPort({
    path: "/dev/ttyACM0",
    baudRate: 9600,
});

const parser = new ReadlineParser();
serialPort.pipe(parser);

parser.on('data', console.log);

let photo;
function takePhoto(){
    	photo = spawn("raspistill", ["-vf", "-n", "-e", "png", "-w", "800", "-h", "600", "-o", "./photos/" + Date.now() + ".png"]);
	photo.stdout.on("data", data => { 
		console.log(`stdout: ${data}`); 
	}); 
}
