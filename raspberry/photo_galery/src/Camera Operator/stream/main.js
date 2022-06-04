const ngrok = require('ngrok');
const { spawn } = require('child_process');

var stream;
module.exports.startStream = function (workerObj) {
    console.log("Starting stream...")
    if (workerObj != null) {
        stream = spawn('python3', ['./Camera Operator/stream/stream.py']);
        workerObj.estado = "Streaming"

        console.log("Objeto do spawn: " + stream);
    }

    stream.stdout.once('data', async () => {
        const url = await ngrok.connect(9090);
        print("Stream em: " + url)
    });

    stream.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        workerObj.estado = "Idle"
    });

}

module.exports.stopStream = function (workerObj) {
    if (workerObj.estado == "Streaming") {
        console.log("Stopping stream...")
        stream.kill();
        workerObj.estado = "Idle"
    }
    else {
        console.log("Not Yet Streaming")
    }
}