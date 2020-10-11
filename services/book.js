/*
* @Time    : 2020/10/10 19:41
* @Author  : DannyDong
* @File    : book.js
* @Description: 电子书数据库相关操作
*/

const Book = require('../models/Book');
const db = require('../db');
const _ = require('lodash');

function exists(book) {

}

function removeBook(book) {

}

async function insertContents(book) {
    const contents = book.getContents();
    if (contents && contents.length > 0) {
        for (let i = 0; i < contents.length; i++) {
            const content = contents[i];
            const _content = _.pick(content, [
                'fileName',
                'id',
                'href',
                'order',
                'level',
                'pid',
                'navId',
            ]);
            await db.insert(_content, 'contents');
        }
    }
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
