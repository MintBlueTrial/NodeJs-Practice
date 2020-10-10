/*
* @Time    : 2020/10/10 19:41
* @Author  : DannyDong
* @File    : book.js
* @Description: 电子书数据库相关操作
*/

const Book = require('../models/Book');
const db = require('../db');

function exists(book) {

}

function removeBook(book) {

}

function insertContents(book) {

}

function insertBook(book) {
    return new Promise(async (resolve, reject) => {
        try {
            if (book instanceof Book) {
                const result = await exists(book);
                if (result) {
                    await removeBook(book);
                    reject(new Error('电子书已存在'));
                } else {
                    await db.insert(book.toDb(), 'book');
                    await insertContents(book);
                    resolve();
                }
            } else {
                reject(new Error('添加的图书不正确'));
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    insertBook,
};
