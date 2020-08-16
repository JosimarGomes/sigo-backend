const DatabaseConnection = require('../configs/database');
const moment = require('moment');

const connection = new DatabaseConnection();

module.exports = {
    async getConsultings(filter = {}) {

        connection.getConnection();

        let query = 'select * from consultorias order by id desc';

        let { results } = await connection.query(query);

        if (results.length > 0) {
            results = await getAllInfoConsulting(results);
        }

        connection.endConnection();

        return results;
    },
    async getConsultingById(id) {

        connection.getConnection();

        let query = `select * from consultorias where id = ${id}`;

        let { results } = await connection.query(query);
        
        if (results.length > 0) {
            results = await getAllInfoConsulting(results);
        }

        connection.endConnection();

        return results[0];
    },
    async insertConsulting(consulting) {

        connection.getConnection();

        const query = `insert into consultorias
            values (
                null,
                "${consulting.titulo}",
                "${moment(consulting.dataInicio).format("YYYY-MM-DD")}",
                "${moment(consulting.dataFim).format("YYYY-MM-DD")}",
                false,
                "${consulting.descricao}",
                ${consulting.empresaId}
            )
        `;

        const { results } = await connection.query(query);

        const consultingCreatedResult = await connection.query(`select * from consultorias where id=${results.insertId}`);
        const consultingCreated = consultingCreatedResult.results[0];
 
        if (consulting.normas && consulting.normas.length > 0) {
            const regulationsQuery = getRegulationInsertQuery(consultingCreated, consulting)            
            await connection.query(regulationsQuery);
        }

        if (consulting.objetivos && consulting.objetivos.length > 0) {
            const objectivesQuery = getObjectivesInsertQuery(consultingCreated, consulting)            
            await connection.query(objectivesQuery);
        }

        if (consulting.consultores && consulting.consultores.length > 0) {
            const consultantsQuery = getConsultantsInsertQuery(consultingCreated, consulting)            
            await connection.query(consultantsQuery);
        }   

        connection.endConnection();

        return consultingCreated;
    }
}

function getRegulationInsertQuery(consultingCreated, consulting) {
    const totalRegulations = consulting.normas.length;
    let regulatinsQuery = 'insert into normas_em_consultorias values';

    if (totalRegulations == 1) {
        regulatinsQuery += ` (null, ${consultingCreated.id}, "${consulting.normas[0].nome}")`;
    } else {
        const allValues = [];
        consulting.normas.forEach(regulation => {
            allValues.push(` (null, ${consultingCreated.id}, "${regulation.nome}")`);
        });
        regulatinsQuery += allValues.join(',');
    }

    return regulatinsQuery;
}

function getObjectivesInsertQuery(consultingCreated, consulting) {
    const totalObjectives = consulting.objetivos.length;
    let objectivesQuery = 'insert into objetivos_em_consultorias values';

    if (totalObjectives == 1) {
        const objective = consulting.objetivos[0];
        objectivesQuery += ` (
            null,
            ${consultingCreated.id},
            "${objective.descricao}",
            "${moment(objective.dataLimite).format("YYYY-MM-DD")}",
            "${objective.responsavel}"
        )`;
    } else {
        const allValues = [];
        consulting.objetivos.forEach(objective => {
            allValues.push(` (
                null,
                ${consultingCreated.id},
                "${objective.descricao}",
                "${moment(objective.dataLimite).format("YYYY-MM-DD")}",
                "${objective.responsavel}"
            )`);
        });
        objectivesQuery += allValues.join(',');
    }

    return objectivesQuery;
}

function getConsultantsInsertQuery(consultingCreated, consulting) {
    const totalConsultants = consulting.consultores.length;
    let consultantsQuery = 'insert into consultores_em_consultorias values';

    if (totalConsultants == 1) {
        consultantsQuery += ` (${consulting.consultores[0].id}, ${consultingCreated.id})`;
    } else {
        const allValues = [];
        consulting.consultores.forEach(consultant => {
            allValues.push(` (${consultant.id}, ${consultingCreated.id})`);
        });
        consultantsQuery += allValues.join(',');
    }

    return consultantsQuery;
}

async function getAllInfoConsulting(results) {
    const consultingsIds = results.map(consulting => consulting.id);
    const consultingsIdsQuery = consultingsIds.join(',');

    const comapniesIds = results.map(consulting => consulting.empresaId);
    const companiesIdsQuery = comapniesIds.join(',');

    const regulationsQuery = `select * from normas_em_consultorias
        where consultoriaId in (${consultingsIdsQuery})`;
    const regulations = await connection.query(regulationsQuery);

    const objectivesQuery = `select * from objetivos_em_consultorias
        where consultoriaId in (${consultingsIdsQuery})`;
    const objectives = await connection.query(objectivesQuery);

    const consultantsQuery = `select
        consultores.id,
        consultores.email,
        consultores.nome,
        consultores.cpf,
        con_c.consultoriaId
        from consultores_em_consultorias con_c
        left join consultores on consultores.id = con_c.consultorId
        where con_c.consultoriaId in (${consultingsIdsQuery})`;
    const consultants = await connection.query(consultantsQuery);

    const companiesQuery = `select * from empresas where id in (${companiesIdsQuery})`
    const companies = await connection.query(companiesQuery);

    results.forEach(consulting => {
        consulting.normas = regulations.results.filter(regulation => (
            regulation.consultoriaId == consulting.id));

        consulting.objetivos = objectives.results.filter(objective => (
            objective.consultoriaId === consulting.id));
        
        consulting.consultores = consultants.results.filter(consultant => (
            consultant.consultoriaId === consulting.id));
        
        consulting.empresa = companies.results.find(company => (
            company.id === consulting.empresaId));
    })

    return results;
}