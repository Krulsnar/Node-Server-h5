const { send } = require("../utils/utils")
const sql = require("../services/databaseCon")
const Person = require("../model/personClass");

module.exports = {
    GET: {
        handler: async function(req, res, id) {
            var person = new Person();
            const query = id === undefined ? "select * from person" : `select * from person where id = ${id}`;
            person = await sql.connect(query);

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
        handler: function(req, res, id) {
            var person = new Person("test", "test", "test");
            send(req, res, person);
        }
    },
    DELETE: {
        handler: async function(req, res, id) {
            var person = new Person();
            person = await sql.connect(`select * from person where id = ${id}`);
            
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