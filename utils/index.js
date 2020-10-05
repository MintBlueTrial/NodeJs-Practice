/*
* @Time    : 2020/10/5 23:54
* @Author  : DannyDong
* @File    : index.js
* @Description: 主文件
*/

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = require('./constant');

// md5加密
function md5(s) {
    return crypto.createHash('md5').update(String(s)).digest('hex');
}

// 解析JWT
function decode(req) {
    const authorization = req.get('Authorization');
    let token = '';
    if (authorization.indexOf('Bearer') >= 0) {
        token = authorization.replace('Bearer ', '');
    } else {
        token = authorization;
    }
    console.log(jwt.verify(token, PRIVATE_KEY));
    return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
    md5, decode,
};
