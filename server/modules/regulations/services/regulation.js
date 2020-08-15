const regulationRepository = require('../repositories/regulations');

async function getAllRegulations(filter) {
    const regulations = await regulationRepository.getGedWebRepository(filter);
    return regulations;
}

async function getCompanyRegulations(filter) {
    const regulations = await regulationRepository.getRegulations(filter);
    return regulations;
}

async function insertRegulation(regulationToCreate) {
    const regulation = await regulationRepository.createRegulations(regulationToCreate);
    return regulation;
}

module.exports = {
    getAllRegulations,
    getCompanyRegulations,
    insertRegulation
}