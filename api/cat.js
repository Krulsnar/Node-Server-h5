const { send } = require("../utils/utils")

module.exports = {
    GET: {
        handler: function(req, res) {
            send(req, res, {says: "Meow", method: req.method});
        }
    },
    POST: {
        handler: function(req, res) {
            send(req, res, {says: "Meow", method: req.method});
        }
    }
}