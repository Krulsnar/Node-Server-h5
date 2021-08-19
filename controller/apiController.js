const utils = require("../utils/utils");
const logger = require("../utils/logger");
const api = {};

api["duck"] = require("../api/duck");
api["cat"] = require("../api/cat");
api["person"] = require("../api/person");

module.exports = function (req, res) {
    logger(req, res);
    const endpoint = new URL(req.url, "http://localhost:3003").pathname;

    const apiRX = /^(\/api\/(?<route>\w+))\/?(?<id>\d+)*$/
    result = endpoint.match(apiRX);
    const { method } = req;

    if(result) {
        const { route, id } = result.groups;
        if (api[route] && id) {
            if (api[route][method] && id) {
                if (method !== "POST") {
                    api[route][method].handler(req, res, id);
                    return;
                }
            }
            utils.send(req, res, {message: "Method not allowed"}, 405);
            return;
        }
        else if (api[route]) { 
            if (api[route][method]) {
                if (method === "GET" || method === "POST") {
                    api[route][method].handler(req, res);
                    return;
                }
            }
            utils.send(req, res, {message: "Method not allowed"}, 405);
            return;
        }
    }

    utils.send(req, res, {message: `Ressource '${endpoint}' not available.`}, 404);
};