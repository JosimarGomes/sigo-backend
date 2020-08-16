const DatabaseConnection = require('../configs/database');

const connection = new DatabaseConnection();

module.exports = {
    async getConsultants(filter = {}) {

        connection.getConnection();

        let query = 'select * from consultores';

        if (filter.email) {
            query += ` where email="${filter.email}"`;            
        }

        if (filter.id) {
            query += ` where id=${filter.id}`;            
        }

        if (filter.empresaId) {
            query += ` where empresaId=${filter.empresaId}`;
        }

        const consultants = await connection.query(query);

        connection.endConnection();

        return consultants.results;
    },
    async insertConsultant(consultant) {

        connection.getConnection();

        const query = `insert into consultores
            values (null, "${consultant.email}", "${consultant.nome}", ${consultant.cpf}, ${consultant.empresaId})`;

        const { results } = await connection.query(query);

        const consultantCreated = await connection.query(`select * from consultores where id=${results.insertId}`);

        connection.endConnection();

        return consultantCreated.results[0];
    }
}