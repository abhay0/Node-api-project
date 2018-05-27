const {User} = require('../models/users');

const authenticate = (req, res, next) =>{
    const token = req.header('x-auth');

    User.getUserByToken(token).then((user) => {
        if(!user){
            return Promise.reject()
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => res.status(401).send(e))
}

module.exports = {authenticate};