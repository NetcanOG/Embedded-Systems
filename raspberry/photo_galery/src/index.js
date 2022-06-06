// Photos Webserver
var express = require('express');
var app = express();

let PORT = 3000;

require("./Route Manager/manager")(app);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
