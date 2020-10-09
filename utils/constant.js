/*
* @Time    : 2020/10/2 23:49
* @Author  : DannyDong
* @File    : constant.js
* @Description: 常量
*/

// 获取环境参数
const {env} = require('./env');
// 电子书存储路径
const UPLOAD_PATH = env === 'dev'
    ? '/Users/dongdanny/ForGitHub/NodeJsPractice/upload/UploadEBook'
    : '/home/upload/EBook';

module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    CODE_TOKEN_EXP: -2,
    DEBUG: true,
    PWD_SALT: 'DDDDanny',
    PRIVATE_KEY: 'MintBlue',
    JWT_EXPIRED: 60 * 60,
    UPLOAD_PATH,
};
