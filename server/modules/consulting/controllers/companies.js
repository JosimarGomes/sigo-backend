const companyService = require('../services/companies');

async function index(req, res) {
    try {

        const filter = req.query;

        const companies = await companyService.getCompanies(filter);
        res.json(companies);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

async function create(req, res) {
    try {

        const companyParams = req.body;

        const company = await companyService.insertCompany(companyParams);
        res.json(company);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

async function getById(req, res) {

    try {
        const { id } = req.params;

        const [company] = await companyService.getCompanies({ id });
        res.json(company);

    } catch(err) {
        console.log("err", err)
        res.sendStatus(500);
    }
}

module.exports = {
    index,
    create,
    getById
}