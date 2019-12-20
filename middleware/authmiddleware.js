const jwt = require('jsonwebtoken');
const secret = require('../jwtSecret');

function userAuth(req, res, next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json({ message: "Validation failed" });
            } else {
                req.decodedJWT = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

function helperAuth(req, res, next){

}

module.exports = {
    userAuth,
    helperAuth
}