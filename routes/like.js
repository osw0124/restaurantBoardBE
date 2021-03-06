const express = require('express');
const router = express.Router();
const Like = require('../schemas/likeSchema');
const Board = require('../schemas/boardSchema');
const authMiddleware = require('../middlewares/auth-middleware');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 좋아요 데이터 보내주기
router.get('/getlike/:postid', async(req, res) => {
    const LikedData = await Like.find({ post_id: req.params.postid }).populate('post_id', '_id').exec();
    
    res.status(200).json({ response: LikedData });
})

// 게시글 좋아요 저장
router.post('/like/:postid', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    const { like_count } = req.body;
    // console.log("like_count:", like_count);
    const variable = { post_id: req.params.postid, user_nick: user.user_nick };
    
    await Like.create(variable);
    await Board.findByIdAndUpdate(req.params.postid, { like_count: like_count })
    res.status(200).json({ response: '좋아요 눌렀어요!' });
});

// 게시글 좋아요 해제
router.post('/unlike/:postid', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    // console.log("req.body:", req.body);
    const { like_count } = req.body;
    // console.log("like_count:", like_count);
    
    const variable = { post_id: req.params.postid, user_nick: user.user_nick };
    await Board.findByIdAndUpdate(req.params.postid, { like_count: like_count });

    Like.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({ response: false, err });
        res.status(200).json({ response: '좋아요 취소!' });
    });
});

module.exports = router;