const connection = require('../configs/database');
const moment = require('moment');

module.exports = {
    async getCompanies(filter = {}) {
        let query = 'select * from empresas';

        if (filter.cnpj) {
            query += ` where cnpj="${filter.cnpj}"`;            
        }

        if (filter.id) {
            query += ` where id=${filter.id}`;            
        }

        const companies = await connection.query(query);

        return companies.results;
    },
    async insertCompany(company) {
        const query = `insert into empresas
            values (
                null,
                "${company.nome}",
                "${company.logradouro}",
                ${company.numero},
                "${company.complemento}",
                "${company.bairro}",
                "${company.cidade}",
                "${company.estado}",
                "${company.telefone}",
                "${moment().format("YYYY/MM/DD")}",
                "${company.responsavelCpf}",
                "${company.cnpj}"
            )
        `;

        const { results } = await connection.query(query);

        const companyCreated = await connection.query(`select * from empresas where id=${results.insertId}`)

        return companyCreated.results[0];
    }
}