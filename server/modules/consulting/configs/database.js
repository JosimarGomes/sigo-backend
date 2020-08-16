const mysql      = require('mysql');
// const connection = mysql.createConnection('mysql://b07adeaefe7531:b7d05715@us-cdbr-east-02.cleardb.com/heroku_d6bdf658ab39625?reconnect=true');

module.exports = {

    database: null,
    getConnection: () => {
        this.database = mysql.createConnection('mysql://b07adeaefe7531:b7d05715@us-cdbr-east-02.cleardb.com/heroku_d6bdf658ab39625?reconnect=true');       
    },
    query: query => {

        return new Promise((resolve, reject) => {
            this.database.query(query, function (error, results, fields) {
            
            if (error) {
                reject(error);
            };
                
            resolve({ results });
        })        
      })
    },
    endConnection: () => this.database.end()
};