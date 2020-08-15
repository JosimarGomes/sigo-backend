const express = require('express');
const cors = require('cors');

const authMiddleware = require('./middlewares/auth');

const consultantsControllers = require('./modules/consulting/controllers/consultants');
const companiesControllers = require('./modules/consulting/controllers/companies');
const consultingControllers = require('./modules/consulting/controllers/consulting');
const regulationsControllers = require('./modules/regulations/controllers/regulations');
const authControllers = require('./modules/auth/controllers/auth');
const messagesControllers = require('./modules/integrations/controllers');

const app = express();

app.use(express.json());
app.use(cors());

app.use(authMiddleware);


app.post('/api/auth', authControllers.auth);

app.get('/api/empresas', companiesControllers.index );
app.get('/api/empresas/:id', companiesControllers.getById );
app.post('/api/empresas', companiesControllers.create);
app.get('/api/empresas/:empresaId/consultores', consultantsControllers.index );
app.post('/api/empresas/:empresaId/consultores', consultantsControllers.create );

app.get('/api/consultorias', consultingControllers.index );
app.get('/api/consultorias/:id', consultingControllers.getConsulting );
app.post('/api/consultorias', consultingControllers.create);

app.get('/api/normas', regulationsControllers.index );
app.get('/api/normas/search', regulationsControllers.search );
app.post('/api/normas', regulationsControllers.create);

app.post('/api/eventos', messagesControllers.publish)


const port = process.env.PORT || 3001
app.listen(port, function () {
    console.log(`New app listening on port ${port}!`);
});

// start consumers
require('./modules/integrations/modules-consumers');