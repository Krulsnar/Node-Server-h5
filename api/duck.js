const { send } = require("../utils/utils")

const ducks = [
    {id: 1, name: "Gadwall", says: "Quack"}, 
    {id: 2, name: "Mallard", says: "Quack"},
    {id: 3, name: "Goldeneye", says: "Quack"}
]

module.exports = {
    GET: {
        handler: function(req, res, id) {
            if (id) {
                send(req, res, ducks.find(duck => duck.id == id));
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