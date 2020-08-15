const jwt = require('jsonwebtoken');

// enviroment variable
const SECRET = 'MY_SECRET_HERE';

module.exports = function(req, res, next) {

    if (req.path === '/api/auth') {
        return next();
    }


    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Not Authorized' });
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(token, SECRET);
        return next();
    } catch(err) {
        return res.status(401).json({ message: 'Authorize Error' })
    }
}