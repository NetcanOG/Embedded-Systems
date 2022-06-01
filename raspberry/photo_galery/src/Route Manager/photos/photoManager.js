
const fs = require('fs');
const ip = "rasp1.local";
const PORT = 3000;
const url = ip + ":" + PORT;
module.exports = function (app, photo_dir) {
    app.use("/photos", require("express").static(photo_dir));

    /**
     * Send an array of all photos as a
     * response to get requests to "/photos"
     */
    app.get("/photos", (req, res) => {
        let obj = []
        let new_obj = {}
        for (photo_name of fs.readdirSync(photo_dir)) {
            new_obj = {
                name: photo_name,
                timestamp: photo_name.split(/\.(?=[^\.]+$)/)[0],
                img_src: "http://" + url + "/photos/" + photo_name,
            }
            obj.push(new_obj)
        }
        res.send(obj);
    });

    app.delete("/photos/:fileName", (req, res) => {
        fs.unlink("../photos/" + req.params.fileName, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
        console.log("File DELETED: " + req.params.fileName);
        res.send("File Deleted");
    });

}