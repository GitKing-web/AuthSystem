const jwt = require('jsonwebtoken');

const verifyToken =(req, res, next) => {
    const token = req.headers?.authorization;
    console.log(token);
    if(!token) return res.status(401).send('You are not authorized')

    jwt.verify(token, process.env.jwt_secret, (err, data) => {
        if(err) return res.status(403).send('Invalid token');

        req.data = data;
        next();
    })
}

const checkUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const { id } = req.data.payload;
        req.userId = id;
        next();
    })
    
}

const tokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.data || req.data.isAdmin){
            next();
        }else {
            return res.status(403).send('Unauthorized');
        }
    })
}

const adminTokenAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {
        if(!req.data.isAdmin) return res.status(403).send('Unauthorized');
        next();
    })
}

module.exports = { verifyToken, tokenAuthorization, adminTokenAuthorization, checkUserAuthorization }