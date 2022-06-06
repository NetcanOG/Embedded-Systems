const ngrok = require('ngrok');
const { spawn } = require('child_process');

module.exports.startStream = function (workerObj) {
    console.log("Starting stream...")
    if (workerObj != null) {
        if (workerObj.estado != "Streaming") {
            workerObj.stream = spawn('python3', ['./Camera Operator/stream/stream.py']);
            workerObj.estado = "Streaming"
            
            workerObj.stream.stdout.once('data', async () => {
                const url = await ngrok.connect(9090);
                print("Stream em: " + url)
            });
        
            workerObj.stream.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                //workerObj.estado = "Idle"
            });
        }

        console.log("Objeto do spawn: " + workerObj.stream);
    }


}

module.exports.stopStream = function (workerObj) {
    if (workerObj.estado == "Streaming") {
        console.log("Stopping stream...")
        workerObj.stream.kill();
        workerObj.estado = "Idle"
    }
    else {
        console.log("Not Yet Streaming")
    }
}