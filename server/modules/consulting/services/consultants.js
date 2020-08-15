const consultantRepository = require('../repositories/consultants');


async function getConsultants(filter) {
    const consultants = await consultantRepository.getConsultants(filter);
    return consultants;
}

async function insertConsultant(consultantParam) {
    const consultant = await consultantRepository.insertConsultant(consultantParam);
    return consultant;
}

module.exports = {
    getConsultants,
    insertConsultant
}