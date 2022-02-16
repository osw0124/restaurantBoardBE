const express = require('express');
const router = express.Router();
const Like = require('../schemas/likeSchema');
const authMiddleware = require('../middlewares/auth-middleware');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 게시글 좋아요
router.post('/like/:postid', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    const likeData = await Like.find({post_id: req.params.postid}).exec();
    console.log("likecount : ", typeof(likecount));
    const variable = { post_id: req.params.postid, user_nick: user.user_nick, like_count: ++likeData.like_count };
    console.log("data : ", variable);

    await Like.create(variable);
    res.status(200).json({ variable });
});

// 게시글 좋아요 해제
router.delete('/like/:postid', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    const likeData = await Like.find({post_id: req.params.postid}).exec();
    console.log("likecount : ", typeof(likecount));
    const variable = { post_id: req.params.postid, user_nick: user.user_nick, like_count: --likeData.like_count };

    await Like.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({ response: false, err });
        res.status(200).json({ response: true });
    });
});

module.exports = router;