const { send } = require("../utils")

var ducks = {
    1: {name: "Gadwall", says: "Quack"}, 
    2: {name: "Mallard", says: "Quack"}
}

module.exports = {
    GET: {
        handler: function(req, res, id) {
            if (id) {
                send(req, res, ducks[id]);
            }
            else {
            send(req, res, ducks);
            }
        }
    },
    POST: {
        handler: function(req, res) {
            send(req, res, {says: "Quack", method: req.method});
        }
    }
}