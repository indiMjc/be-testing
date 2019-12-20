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
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json({ message: "Validation failed" });
            } else {
                const decodedJWT = decodedToken;
                if(decodedJWT.type === "helper"){
                    next();
                } else {
                    res.status(401).json({ message: "Must be of type auth type: helper" });
                }
            }
        })
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {
    userAuth,
    helperAuth
}