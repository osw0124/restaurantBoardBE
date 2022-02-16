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

router.get('/comment/:commentid', async (req, res) => {
    const { commentid } = req.params;
    
});



// 상세 페이지 조회
router.get('/getpost/:postid', async(req, res) => {
    const { postid } = req.params;
    const wroteData = await Boards.findById(postid);
    res.json({ response: wroteData });
});


module.exports = router;