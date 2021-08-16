const utils = require("./utils")

module.exports = function (req, res) {
    const endpoint = new URL(req.url, "http://localhost:3003").pathname;

    const regEx = /^\/((css|img|js)\/)?\w+\.(html|css|png|jpe?g|gif|tiff|svg|bmp|js)$/;
    let result = endpoint.match(regEx);
    console.log(result);
    
    if(result) {
        utils.sendFile(req, res, `./static/${result[0]}`)
        return; 
    }

    utils.send(req, res, {message: `Ressource '${endpoint}' not available.`}, 404);
};