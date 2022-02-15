const express = require('express');
const jwt = require('jsonwebtoken');
const SHA256 = require("crypto-js/sha256");
const users = require('../schemas/userSchema');
const auth_middleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// 회원정보 입력, 저장
router.post('/register/save', async (req, res) => {
    let {user_id, user_nick, user_pwd, user_confirmpwd} = req.body;
    if (user_pwd !== user_confirmpwd) {
        res.status(400).send({
            fail: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
        });
        return;
    }

    user_pwd = SHA256(user_pwd).toString();
    console.log(user_pwd);

    const user = new users({user_id, user_nick, user_pwd});
    await user.save();

    res.status(201).send({
        success: '회원가입에 성공했습니다.'
    });
});

// 아이디, 닉네임 중복확인
router.post('/register/check', async (req, res) => {
    const {user_id, user_nick} = req.body;
    console.log(user_id, user_nick);

    const existUsers = await users.find({
        $or: [{user_id}, {user_nick}],
    });
    if (existUsers.length) {
        res.send({
            alert: "이미 가입된 이메일 또는 닉네임이 있습니다."
        });
        return;
    }
    
    res.send({
        alert: '이메일과 닉네임이 사용가능합니다.'
    });
});

// 로그인
router.post('/login', async (req, res) => {
    let { user_id, user_pwd } = req.body;

    user_pwd = SHA256(user_pwd).toString();

    const user = await users.findOne({user_id, user_pwd}).exec();
    if (!user) {
        res.status(401).send({
            fail: "이메일 또는 패스워드가 잘못됬습니다."
        });
        return;
    }

    const token = jwt.sign({userId: user._id, user_nick: user.user_nick}, 'login-secret-key');
    res.send({
        token,
        user_nick: user.user_nick,
        success: '로그인 성공했습니다.'
    });
});

router.get('/check_auth', auth_middleware, async (req, res) => {
    const {user} = res.locals;
    res.send({
        user: {
            user_id: user.user_id,
            user_nick: user.user_nick,
        },
    });
});


module.exports = router;