const connection = require('../configs/database');

module.exports = {
    async getConsultants(filter = {}) {
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

        return consultants.results;
    },
    async insertConsultant(consultant) {
        const query = `insert into consultores
            values (null, "${consultant.email}", "${consultant.nome}", ${consultant.cpf}, ${consultant.empresaId})`;

        const { results } = await connection.query(query);

        const consultantCreated = await connection.query(`select * from consultores where id=${results.insertId}`)

        return consultantCreated.results[0];
    }
}