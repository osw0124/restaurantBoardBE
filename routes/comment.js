const express = require('express');
const router = express.Router();
const Comment = require('../schemas/commentSchema');
const auth_middleware = require("../middlewares/auth-middleware");

//댓글 저장
router.post('/comment/save/:id', auth_middleware, async (req, res) => {
    const { user } = res.locals;
    console.log(user);
    const {user_comment, createDate} = req.body;
    
    

    await Comment.create({user_nick: user.user_nick, user_comment , createDate, articleId: req.params.id});
    console.log();
    res.json({
        success: '댓글이 저장 되었습니다.'
    });
});

//댓글 조회
router.get('/comment/get/:id', async (req, res) => {    
    const { commentid } = req.params;

    const comment_list = Comment.find(commentid).populate(articleId).exec();

    if (comment_list.length) {
        res.send({
            alert: "댓글이 없습니다."
        });
        return;
    }    
    res.json({
        comment_list: comment_list
    });
});

module.exports = router;