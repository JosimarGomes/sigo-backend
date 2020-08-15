const consultingRepository = require('../repositories/consultings');


async function getConsultings(filter) {
    let consultings = await consultingRepository.getConsultings(filter);

    if (filter.consultorId) {
        consultings = consultings.filter(consulting => {
            return consulting.consultores.find(consultant => (
                consultant.id === filter.consultorId
            ));
        });
    }

    return consultings;
}

async function insertConsulting(consultingParam) {
    const consulting = await consultingRepository.insertConsulting(consultingParam);
    return consulting;
}

async function getConsulting(id) {
    const consulting = await consultingRepository.getConsultingById(id);
    return consulting;
}

module.exports = {
    getConsultings,
    insertConsulting,
    getConsulting
}