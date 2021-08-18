const { send } = require("../utils/utils")
const sql = require("../services/databaseCon")

module.exports = {
    GET: {
        handler: async function(req, res, id) {
            const query = id === undefined ? "select * from person" : `select * from person where id = ${id}`;
            const person = await sql.connect(query);
            
            if (person.length == 0) {
                send(req, res, {message: `Person with id: '${id}' not found.`}, 404);
                return;
            }
            if (id) {
                send(req, res, person);
                return;
            }
            
            send(req, res, person);
        }
    },
    POST: {
        handler: function(req, res) {
            send(req, res, {says: "Quack", method: req.method});
        }
    },
    DELETE: {
        handler: async function(req, res, id) {
            const person = await sql.connect(`select * from person where id = ${id}`);
            
            if (person.length != 0) {
                const query = `delete from person where id = ${id}`
                await sql.connect(query);
                send(req, res, {message: `Person with id: '${id}' was delete.`});
                return;
            }

            send(req, res, {message: `Person with id: '${id}' not found.`}, 404);
        }
    }
}