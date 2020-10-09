/*
* @Time    : 2020/10/9 16:02
* @Author  : DannyDong
* @File    : Book.js
* @Description: 电子书相关路由
*/

const express = require('express');
const multer = require('multer');
const {UPLOAD_PATH} = require('../utils/constant');
const Result = require('../models/Result');
const Book = require('../models/Book');

const router = express.Router();

// 上传电子书
router.post(
    '/upload',
    multer({dest: `${UPLOAD_PATH}/book`}).single('file'),
    function(req, res) {
        if (!req.file || req.file.length === 0) {
            new Result('上传失败').fail(res);
        } else {
            const book = new Book(req.file);
            console.log(book);
            new Result('上传成功').success(res);
        }
    });

module.exports = router;
