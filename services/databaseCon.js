const sql = require("mssql/msnodesqlv8");

var config = { 
    user:"", 
    password:"", 
    database:"node_server", 
    driver: 'msnodesqlv8', 
    server:"(localdb)\\MSSQLLocalDB", 
    options: { 
        trustedConnection : true 
    } 
}

exports.connct = async function() {
    try {
        await sql.connect(config)
        const result = await sql.query`select * from person`
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}