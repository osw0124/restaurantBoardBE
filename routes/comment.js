const express = require('express');
const router = express.Router();
const Comment = require('../schemas/commentSchema');
const auth_middleware = require("../middlewares/auth-middleware");

//댓글 저장
router.get('/comment/save', auth_middleware, async (req, res) => {
    const { user } = res.locals;
    console.log(user);
    const {user_comment, createDate} = req.body;

    await Comment.create({user_nick: user.user_nick, user_comment , createDate});
    res.json({
        success: '댓글이 저장 되었습니다.'
    });
});



module.exports = router;