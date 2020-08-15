const consultantService = require('../services/consultants');

async function index(req, res) {
    try {

        const { empresaId } = req.params;
        const { email } = req.query;

        const consultants = await consultantService.getConsultants({ empresaId, email });
        res.json(consultants);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

async function create(req, res) {
    try {

        const consultantParams = req.body;
        const { empresaId } = req.params;

        consultantParams.empresaId = empresaId;

        const consultant = await consultantService.insertConsultant(consultantParams);
        res.json(consultant);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

module.exports = {
    index,
    create
}