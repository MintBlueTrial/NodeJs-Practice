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
const boom = require('boom');

const router = express.Router();

// 上传电子书
router.post(
    '/upload',
    multer({dest: `${UPLOAD_PATH}/book`}).single('file'),
    function(req, res, next) {
        if (!req.file || req.file.length === 0) {
            new Result('上传失败').fail(res);
        } else {
            const book = new Book(req.file);
            book.parse().then(book => {
                new Result(book, '上传电子书成功').success(res);
            }).catch(err => {
                next(boom.badImplementation(err));
            });
        }
    });

module.exports = router;
