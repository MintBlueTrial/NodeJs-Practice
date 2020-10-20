/*
* @Time    : 2020/10/5 22:42
* @Author  : DannyDong
* @File    : index.js
* @Description: 链接数据库
*/

const mysql = require('mysql');
const config = require('./config');
const {DEBUG} = require('../utils/constant');
const {isObject} = require('../utils');

function connect() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port,
    });
}

// 查询多条数据
function querySql(sql) {
    const conn = connect();
    DEBUG && console.log(sql);
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    DEBUG && console.log('查询失败，原因：' + JSON.stringify(err));
                    reject(err);
                } else {
                    // DEBUG && console.log('查询成功，结果：' + JSON.stringify(results));
                    resolve(results);
                }
            });
        } catch (e) {
            reject(e);
        } finally {
            conn.end();
        }
    });
}

// 查询单条数据
function queryOneSql(sql) {
    return new Promise((resolve, reject) => {
        querySql(sql).then(result => {
            if (result && result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

// 插入数据
function insert(model, tableName) {
    return new Promise((resolve, reject) => {
        if (!isObject(model)) {
            reject(new Error('插入数据库失败'));
        } else {
            const keys = [];
            const values = [];
            Object.keys(model).forEach(key => {
                if (model.hasOwnProperty(key)) {
                    keys.push(`\`${key}\``);
                    values.push(`'${model[key]}'`);
                }
            });
            if (keys.length > 0 && values.length > 0) {
                let sql = `INSERT INTO \`${tableName}\` (`;
                const keysString = keys.join(',');
                const valuesString = values.join(',');
                sql = `${sql}${keysString}) VALUES (${valuesString})`;
                DEBUG && console.log(sql);
                const conn = connect();
                try {
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                } catch (e) {
                    reject(e);
                } finally {
                    conn.end();
                }
            } else {
                reject(new Error('插入数据库失败'));
            }
        }
    });
}

// 更新数据
function update(model, tableName, where) {
    return new Promise((resolve, reject) => {
        if (!isObject(model)) {
            reject(new Error('插入数据库失败'));
        } else {
            const entry = [];
            Object.keys(model).forEach(key => {
                if (model.hasOwnProperty(key)) {
                    entry.push(`\`${key}\`='${model[key]}'`);
                }
            });
            if (entry.length > 0) {
                let sql = `UPDATE \`${tableName}\` SET`;
                sql = `${sql} ${entry.join(',')} ${where}`;
                const conn = connect();
                try {
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                } catch (e) {
                    reject(e);
                } finally {
                    conn.end();
                }
            }
        }
    });
}

// 组合where查询语句
function and(where, k, v) {
    if (where === 'where') {
        return `${where} \`${k}\`='${v}'`;
    } else {
        return `${where} and \`${k}\`='${v}'`;
    }
}

// 模糊查询
function andLike(where, k, v) {
    if (where === 'where') {
        return `${where} \`${k}\` like '%${v}%'`;
    } else {
        return `${where} and \`${k}\` like '%${v}%'`;
    }
}

module.exports = {
    querySql, queryOneSql, insert, update, and, andLike,
};
