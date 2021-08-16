const http = require("http");

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.write("Hello World!");
    res.end();
});

server.listen(3003);
