const { send, getJSONData } = require("../utils/utils")
const sql = require("../services/databaseCon")
const Person = require("../model/personClass");

module.exports = {
    GET: {
        handler: async function(req, res, id) {
            try {
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
            } catch (err) {
                send(req, res, err, 500)     
            }
        }
    },
    POST: {
        handler: async function(req, res) {
            try {
                let person = new Person();
                person = await getJSONData(req);

                await sql.connect(`insert into person(firstName, lastName, email) values ('${person.firstName}', '${person.lastName}', '${person.email}')`)
                send(req, res, "Person created!")

            } catch (err) {
                send(req, res, err, 500)
            }
        }
    },
    PUT: {
        handler: async function(req, res, id) {
            try {
                let person = new Person();
                person = await sql.connect(`select * from person where id = ${id}`);

                if (person.length != 0) {
                    let updatePerson = new Person();
                    updatePerson = await getJSONData(req);

                    await sql.connect(
                        `update person set 
                        firstName = '${updatePerson.firstName}', 
                        lastName = '${updatePerson.lastName}', 
                        email = '${updatePerson.email}' 
                        where id = ${id}`
                    )
                    send(req, res, updatePerson);
                    return;
                }
                send(req, res, {message: `Person with id: '${id}' not found.`}, 404);       
            } catch (err) {
                send(req, res, err, 500)
            }
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