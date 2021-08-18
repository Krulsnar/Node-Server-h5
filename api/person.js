const { send } = require("../utils/utils")
const sql = require("../services/databaseCon")

module.exports = {
    GET: {
        handler: async function(req, res, id) {
            const query = id === undefined ? "select * from person" : `select * from person where id = ${id}`;
            const person = await sql.connect(query);
            if (id) {
                send(req, res, person);
            }
            else {
            send(req, res, person);
            }
        }
    },
    POST: {
        handler: function(req, res) {
            send(req, res, {says: "Quack", method: req.method});
        }
    }
}