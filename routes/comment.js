const express = require('express');
const Comment = require('../schemas/commentSchema');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.use(express.json());
router.use(express.urlencoded({extended: true}));