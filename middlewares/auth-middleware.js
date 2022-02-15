const jwt = require("jsonwebtoken");
const users = require('../schemas/userSchema');
const jwtSecret = process.env.SECRET_KEY;

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
        const {userId} = jwt.verify(tokenValue, `${jwtSecret}`);
        users.findById(userId).exec().then((user) => {
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
};