const utils = require("./utils");
const logger = require("./logger");
const api = {};

api["/api/duck"] = require("./api/duck");
api["/api/cat"] = require("./api/cat");

module.exports = function (req, res) {
    logger(req, res);
    const endpoint = new URL(req.url, "http://localhost:3003").pathname;

    const regEx = /^\/((css|img|js)\/)?[\w-]+\.(html|css|png|jpe?g|gif|tiff|svg|bmp|js)$/;
    let result = endpoint.match(regEx);
    
    if(result) {
        //utils.sendFile(req, res, `./static/${result[0]}`)
        utils.streamFile(req, res, `./static/${result[0]}`);
        return; 
    }

    const apiRX = /^(\/api\/\w+)\/?([0-9]+)*/;
    result = endpoint.match(apiRX);
    let id = result[2];
    
    if(result) {
        if (api[result[0]]) {
            if (api[result[0]][req.method]) {
                api[result[0]][req.method].handler(req, res);
                return;
            }
            utils.send(req, res, {message: "Method not allowed"}, 405);
            return;
        }
        else if (api[result[1]]) {
            if (api[result[1]][req.method]) {
                api[result[1]][req.method].handler(req, res, id);
                return;         
            }
        }
    }

    utils.send(req, res, {message: `Ressource '${endpoint}' not available.`}, 404);
};