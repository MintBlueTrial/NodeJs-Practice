/*
* @Time    : 2020/10/5 23:54
* @Author  : DannyDong
* @File    : index.js
* @Description: 主文件
*/

const crypto = require('crypto');

// md5加密
function md5(s) {
    return crypto.createHash('md5').update(String(s)).digest('hex');
}

module.exports = {
    md5,
};
