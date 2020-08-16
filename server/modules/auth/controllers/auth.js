const consultantService = require('../../consulting/services/consultants');
const jwt = require('jsonwebtoken');

// enviroment variable
const SECRET = 'MY_SECRET_HERE';

async function auth(req, res) {
    try {
        const { email, senha } = req.body;
        
        // mock user 
        if (email === "gestorteste@gmail.com") {

            if (senha !== '12345') {
                return res.status(403).json({ message: 'Senha inválida' });
            }
            
            const userData = JSON.stringify({
                email,
                perfil: 'gestor',
                id: 99999,
                nome: 'José Gestor da Silva'
            });

            const token = jwt.sign(userData, SECRET);

            return res.json(token);
        }

        const [consultant] = await consultantService.getConsultants({ email });

        if (!consultant) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (senha !== '12345') {
            return res.status(403).json({ message: 'Senha inválida' });
        }

        const userData = JSON.stringify({
            email: consultant.email,
            perfil: 'consultor',
            id: consultant.id,
            nome: consultant.nome
        });

        const token = jwt.sign(userData, SECRET);;
        
        res.json(token);

    } catch(err) {
        console.log("err", err)
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    auth,
}