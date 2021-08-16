const fs = require("fs");

exports.send = function(req, res, msg, status = 200) {
    res.statusCode = status;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(msg));
}

exports.sendFile = function(req, res, filepath) {
    fs.readFile(filepath, function(err, content) {
        if(err) {
            exports.send(req, res, err, 404);
            return;
        };

        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end(content);
    })
};