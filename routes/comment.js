const express = require('express');
const router = express.Router();
const Comment = require('../schemas/commentSchema');
const auth_middleware = require("../middlewares/auth-middleware");

//댓글 저장
router.get('/comment/save', auth_middleware, async (req, res) => {
    const { user } = res.locals;
    console.log(user);
    const {user_comment} = req.body;

    await Comment.create({user_nick: user.user_nick, user_comment ,createdData});
    res.json({
        success: '댓글이 저장 되었습니다.'
    });
});



// 메인 페이지에 페이지 목록 불러오기
router.get('/main', async(req, res) => {
    const createdData = await Boards.find().exec();
    res.json({ response: createdData });
});

// 쓴 글 데이터를 DB에 저장
router.post('/addpost/save', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    const { image_url, title, location, comment, score, createdDate } = req.body;
    
    // merge후에 user_nick, image_url을 채워넣어야 합니다.
    await Boards.create({ image_url, user_nick: user.user_nick, title, location, comment, createdDate });
    res.json({ success: '맛집 정보가 저장되었습니다!' })
});
