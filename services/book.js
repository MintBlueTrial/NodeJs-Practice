/*
* @Time    : 2020/10/10 19:41
* @Author  : DannyDong
* @File    : book.js
* @Description: 电子书数据库相关操作
*/

const Book = require('../models/Book');
const db = require('../db');
const _ = require('lodash');

// 判断电子书是否存在
function exists(book) {
    const {title, author, publisher} = book;
    const sql = `select * from book where title='${title}' and author='${author}' and publisher='${publisher}'`;
    return db.queryOneSql(sql);
}

async function removeBook(book) {
    if (book) {
        book.reset();
        if (book.fileName) {
            const removeBookSql = `delete from book where fileName = '${book.fileName}'`;
            const removeContent = `delete from contents where fileName='${book.fileName}'`;
            await db.querySql(removeBookSql);
            await db.querySql(removeContent);
        }
    }
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
                'text',
                'label',
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

function getBook(fileName) {
    return new Promise(async (resolve, reject) => {
        const bookSql = `select * from book where fileName='${fileName}'`;
        const contentsSql = `select * from contents where fileName='${fileName}' order by \`order\``;
        const book = await db.queryOneSql(bookSql);
        console.log(book);
        const contents = await db.querySql(contentsSql);
        if (book) {
            book.cover = Book.genCoverUrl(book);
            book.contentsTree = Book.genContentsTree(contents);
            resolve(book);
        } else {
            reject(new Error('电子书不存在'));
        }
    });
}

module.exports = {
    insertBook, getBook,
};
