const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : '',
    user     : 'root',
    password : 'password',
    database : 'sigo-consultorias'
});

module.exports = {

    getConnection: () => connection.connect(),
    query: query => {

        return new Promise((resolve, reject) => {
            connection.query(query, function (error, results, fields) {
            
            if (error) {
                reject(error);
            };
                
            resolve({ results });
        })        
      })
    },
    endConnection: () => connection.end()
};