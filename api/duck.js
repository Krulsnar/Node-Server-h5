const { send } = require("../utils")

module.exports = {
    GET: {
        handler: function(req, res) {
            send(req, res, {says: "Quack", method: req.method});
        }
    },
    POST: {
        handler: function(req, res) {
            send(req, res, {says: "Quack", method: req.method});
        }
    }
}