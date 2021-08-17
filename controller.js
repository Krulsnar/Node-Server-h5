const utils = require("./utils");
const logger = require("./logger");
const api = {};

api["duck"] = require("./api/duck");
api["cat"] = require("./api/cat");

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

    const apiRX = /^(\/api\/(?<route>\w+))\/?(?<id>[0-9]+)*/
    result = endpoint.match(apiRX);
    const { route, id } = result.groups;
    const { method } = req;

    if(result) {
        if (api[route] && id) {
            if (api[route][method] && id) {
                api[route][method].handler(req, res, id);
                return;         
            }
            utils.send(req, res, {message: "Method not allowed"}, 405);
            return;
        }
        else if (api[route]) {
            if (api[route][method]) {
                api[route][method].handler(req, res);
                return;
            }
            utils.send(req, res, {message: "Method not allowed"}, 405);
            return;
        }
    }

    utils.send(req, res, {message: `Ressource '${endpoint}' not available.`}, 404);
};