const jwt = require("jsonwebtoken");
const users = require('../schemas/userSchema');
const SECRET_KEY = require("../env");

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    // console.log(authorization);
    const [tokenType, tokenValue] = authorization.split(' ');
    

    console.log(tokenValue);
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }

    try {
        const {userId} = jwt.verify(tokenValue, SECRET_KEY);
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
};