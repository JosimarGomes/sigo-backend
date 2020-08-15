const regulationService = require('../services/regulation');

async function index(req, res) {
    try {

        const filter = req.query;

        const regulations = await regulationService.getCompanyRegulations(filter);
        res.json(regulations);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

async function search(req, res) {
    try {

        const filter = req.query;

        const regulations = await regulationService.getAllRegulations(filter);
        res.json(regulations);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

async function create(req, res) {
    try {

        if (req.user.perfil !== 'gestor') {
            res.status(401),json({ message: 'Not Authorized' })
        }

        const regulationToCreate = req.body;

        const regulation = await regulationService.insertRegulation(regulationToCreate);
        res.json(regulation);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

module.exports = {
    index,
    create,
    search
}