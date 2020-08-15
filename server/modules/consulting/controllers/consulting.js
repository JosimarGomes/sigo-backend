const consultingService = require('../services/consultings');

async function index(req, res) {
    try {

        const filter = req.query;

        if (req.user.perfil !== 'gestor') {
            filter.consultorId = req.user.id;
        }

        const consultings = await consultingService.getConsultings(filter);
        res.json(consultings);

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

        const consultingParams = req.body;

        const consulting = await consultingService.insertConsulting(consultingParams);
        res.json(consulting);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

async function getConsulting(req, res) {
    try{
        const { id } = req.params;
        const consulting = await consultingService.getConsulting(id);
        res.json(consulting); 

    } catch(err) {
        console.log("err", err);
        res.sendStatus(500);
    }
}

module.exports = {
    index,
    create,
    getConsulting
}