const http = require("http");
const controller = require("./controller/apiController")
// const controller = {};

// controller["animalController"] = require("./controller/animalController");
// controller["personController"] = require("./controller/personController");

http.createServer(controller).listen(3003, function() {
    console.log("Server started, click here: http://localhost:3003")
});