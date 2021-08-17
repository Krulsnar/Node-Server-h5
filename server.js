const http = require("http");
const controller = require("./controller")

http.createServer(controller).listen(3003, function() {
    console.log("Server started, click here: http://localhost:3003")
});
