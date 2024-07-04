const jwt =require('jsonwebtoken');

const verifyToken =(req, res, next) => {
    const authHeader = req.headers.token;
    const token = authHeader.split(' ')[1];
    if(!token || token === null) return res.status(401).send('Unable to perform request')
    if(!authHeader) return res.status(401).send('You are not authorized')

    jwt.verify(token, process.env.jwt_secret, (err, data) => {
        if(err) return res.status(403).send('Invalid token');

        req.data = data;
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

module.exports = { verifyToken, tokenAuthorization, adminTokenAuthorization }