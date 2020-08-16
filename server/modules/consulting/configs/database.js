const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'us-cdbr-east-02.cleardb.com',
    user     : 'b07adeaefe7531',
    password : 'b7d05715',
    database : 'heroku_d6bdf658ab39625'
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