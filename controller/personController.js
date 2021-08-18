const utils = require("../utils/utils");
const logger = require("../utils/logger");
const sql = require("../services/databaseCon");

module.exports = function (req, res) {
    logger(req, res);
    const endpoint = new URL(req.url, "http://localhost:3003").pathname;
    sql.connct();

    utils.send(req, res, {message: `Ressource '${endpoint}' not available.`}, 404);
};