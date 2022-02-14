const express = require('express');
const router = express.Router();
const Boards = require('../schemas/boardSchema');
const authMiddleware = require('../middlewares/auth-middleware');
const shortUrl = require('node-url-shortener');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// 메인 페이지에 페이지 목록 불러오기
router.get('/main', async(req, res) => {
    const createdData = await Boards.find().exec();
    res.json({ response: createdData });
});

// 쓴 글 데이터를 DB에 저장
router.post('/addpost/save', authMiddleware, async(req, res) => {
    const { user } = res.locals;
    const { title, location, comment, score, createdDate } = req.body;
    const shorturl = shortUrl.short(req.body.image_url);
    
    // merge후에 user_nick, image_url을 채워넣어야 합니다.
    await Boards.create({ image_url: shorturl, user_nick: user.user_nick, title, location, comment, createdDate });
    res.json({ success: '맛집 정보가 저장되었습니다!' })
});

// 상세 페이지 조회
router.get('/getpost/:postid', async(req, res) => {
    const { postid } = req.params;
    const wroteData = await Boards.findById(postid);
    res.json({ response: wroteData });
});

// 페이지 내용 수정
router.patch('/getpost/modify/:postid', async(req, res) => {
    await Boards.findByIdAndUpdate(req.params.postid, { response: req.body })
    res.json({ success: '수정 성공!'})
});

// 게시글 삭제
router.delete('/getpost/delete/:postid', async (req, res) => {
    const { postid } = req.params;
    await Boards.deleteOne({ _id: postid });
    res.json({ success: '삭제 성공'});
});

// 다른 js파일에서 참조하기 위한 명령어
module.exports = router;