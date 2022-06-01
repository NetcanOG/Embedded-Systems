const { Worker } = require("worker_threads");
const seconds_between_photo = 5;

// 'id' used to show that every "new" worker, is actually the same worker
var id = 0;

class cameraWorker{
    worker = null;
    constructor(){
        this.id = id+1;
        id += 1;
        this.worker = new Worker("./camera_worker.js");

        this.worker.on("message", result => {
            console.log(result);
        });
    
        this.worker.on("error", error => {
            console.log(error);
        });
    
        this.worker.on("exit", exitCode => {
            console.log(`It exited with code ${exitCode}`);
        })
    }
}

var worker = null;
/**
 * Singleton formatted worker, to avoid having
 * multiple workers taking more pictures than needed
 * @returns cameraWorker
 */
module.exports.newCameraWorker = function newCameraWorker() {
    if(worker != null)
        return worker;
        
    worker = new cameraWorker();
    return worker;
}