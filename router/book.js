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
const {decode} = require('../utils');
const bookService = require('../services/book');

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
    },
);

router.post(
    '/create',
    function(req, res, next) {
        const decoded = decode(req);
        if (decoded && decoded.username) {
            req.body.username = decoded.username;
        }
        const book = new Book(null, req.body);
        bookService.insertBook(book).then(() => {

        }).catch(err => {
            next(boom.badImplementation(err));
        });
        console.log(book);
    },
);

module.exports = router;
