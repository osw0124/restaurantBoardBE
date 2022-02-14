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
        const {user_id} = jwt.verify(tokenValue, "login-secret-key");
        console.log(user_id);
        users.findOne({user_id: user_id}).then((user) => {
            res.locals.user = user;
            console.log(res.locals.user);
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