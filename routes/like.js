const express = require('express');
const router = express.Router();
const Like = require('../schemas/likeSchema');
const authMiddleware = require('../middlewares/auth-middleware');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 게시글 좋아요
router.post('/like/:postid', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    let likecount = Like.like_count;
    const variable = { post_id: req.params.postid, user_nick: user.user_nick, like_count: likecount++ };

    const like = new Like(variable);
    await like.save((err, likeResult) => {
        if (err) return res.json({ response: false, err });
        res.status(200).json({ variable });
    })
});

// 게시글 좋아요 해제
router.delete('/like/:postid', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    let likecount = Like.like_count;
    const variable = { post_id: req.params.postid, user_nick: user.user_nick, like_count: likecount-- };

    await Like.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({ response: false, err });
        res.status(200).json({ response: true });
    });
});

module.exports = router;