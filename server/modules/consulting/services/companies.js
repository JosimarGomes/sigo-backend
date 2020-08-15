const companyRepository = require('../repositories/companies');


async function getCompanies(filter) {
    const companies = await companyRepository.getCompanies(filter);
    return companies;
}

async function insertCompany(companyParam) {
    const company = await companyRepository.insertCompany(companyParam);
    return company;
}

module.exports = {
    getCompanies,
    insertCompany
}