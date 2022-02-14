const jwt = require("jsonwebtoken");
const users = require('../schemas/userSchema');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');

    console.log(tokenValue);
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }

    try {
        const {userId} = jwt.verify(tokenValue, "login-secret-key");
        console.log(userId);
        users.findById(userId).exec().then((user) => {
            res.locals.user = user;
            next();
        });        
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }

    next();
};