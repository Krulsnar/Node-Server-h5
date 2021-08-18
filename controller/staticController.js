const utils = require("../utils/utils");
const logger = require("../utils/logger");
const api = {};

api["duck"] = require("../api/duck");
api["cat"] = require("../api/cat");

module.exports = function (req, res) {
    logger(req, res);
    const endpoint = new URL(req.url, "http://localhost:3003").pathname;

    const staticRX = /^\/((css|img|js)\/)?[\w-]+\.(html|css|png|jpe?g|gif|tiff|svg|bmp|js)$/;
    let result = endpoint.match(staticRX);
    
    if(result) {
        //utils.sendFile(req, res, `./static/${result[0]}`)
        utils.streamFile(req, res, `./static/${result[0]}`);
        return; 
    }
    
    utils.send(req, res, {message: `Ressource '${endpoint}' not available.`}, 404);
};