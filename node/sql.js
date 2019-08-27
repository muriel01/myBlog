var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});
// 开始连接
connection.connect();

// 新增的 SQL 语句及新增的字段信息
addSqlFun=(addSql,addSqlParams)=>{
    return new Promise((resolve,reject)=>{
        // 连接 SQL 并实施语句
        connection.query(addSql, addSqlParams, function (error1, response1) {
            if (error1) { // 如果 SQL 语句错误
                reject(error1);
            } else {
                resolve();
            }
        })
    });
};

//查询数据库
searchSqlFun = (readSql, password) => {
    console.log('sql语句', readSql);
    // 连接 SQL 并实施语句
    return new Promise((resolve, reject) => {
        connection.query(readSql, function (error1, response1) {
            if (error1) {
                reject(error1);
            } else {
                if (response1 == undefined || response1.length == 0) { // 不存在用户
                    reject('没有数据');
                    return
                } else { // 存在用户
                    let newRes = JSON.parse(JSON.stringify(response1));
                    console.log(newRes);
                    resolve(newRes);
                }
            }
        });
    })
};

module.exports = {
    'addSqlFun':addSqlFun,
    'searchSqlFun':searchSqlFun
};