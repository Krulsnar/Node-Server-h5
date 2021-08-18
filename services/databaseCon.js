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

exports.connect = async function(query) {
    try {
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}