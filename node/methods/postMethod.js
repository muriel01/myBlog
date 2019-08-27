
let takeSql = require('../sql.js');

//登录
loginFun=(result)=>{
    return new Promise((resolve,reject)=>{
        let username = result.username; // 用户名
        let password = result.password; // 密码
        // 新增的 SQL 语句及新增的字段信息
        let readSql = "SELECT * FROM user WHERE user_name  = '" + username + "'";
        takeSql.searchSqlFun(readSql,password).then(res=>{
            if(res[0].password == password) { // 密码正确
                // 返回数据
                let data = {
                    id: res[0].id,
                    userName: res[0].user_name
                };
                resolve(data);
            } else { // 密码错误
                reject('密码错误');
            }
        }).catch(err=>{
            reject('不存在该用户！');
        })
    })
};

//注册
registerFun=(result)=>{
    return new Promise((resolve,reject)=>{
        let username = result.username; // 用户名
        let time = getNowFormatDate(); // 时间
        // 查询 user 表 (判断用户是否为新用户)
        // 使用 Promise 的原因是因为中间调用了两次数据库，而数据库查询是异步的，所以需要用 Promise。
        let readSql = "SELECT user_name FROM user WHERE user_name='"+username+"'";
        console.log('sql:',readSql);
        takeSql.searchSqlFun(readSql).then(res=>{
            let userNameRepeat = res.length;
            console.log(res);
            // 如果姓名重复
            if(userNameRepeat) {
                reject("注册失败，姓名重复！");
            }
        }).catch(err=>{
            let addSql = "INSERT INTO user(user_name,password,create_time) VALUES(?,?,?)";
            let addSqlParams = [result.username, result.password, time];
            takeSql.addSqlFun(addSql,addSqlParams).then(res=>{
                console.log(res);
                resolve('注册成功');
            }).catch(err=>{
                reject(err);
            })
        });
    })
};

//添加留言
sendMessage=(result)=>{
    return new Promise((resolve, reject)=>{
        let id = result.userid; // id
        let userName = result.username; // 用户名
        let messageText = result.message; // 留言内容
        let time = getNowFormatDate(); // 时间
        // 新增的 SQL 语句及新增的字段信息
        let addSql = "INSERT INTO message(user_message, user_id, user_name, time) VALUES(?, ?, ?, ?)";
        let addSqlParams = [messageText, id, userName, time];

        takeSql.addSqlFun(addSql,addSqlParams).then(res=>{
            resolve();
        }).catch(err=>{
            reject(err);
        });
    })
};

//发布文章
addArticleFun=(result)=>{
    return new Promise((resolve, reject)=>{
        let articleName = result.articleName; // 文章名
        let content = result.content; // 文章内容
        let userId = result.userId; // 用户id
        let userName = result.userName; // 用户名
        let create_time = getNowFormatDate(); // 发布时间
        // 新增的 SQL 语句及新增的字段信息
        let addSql = "INSERT INTO article(article_name, content, user_id, user_name, create_time) VALUES(?, ?, ?, ?, ?)";
        let addSqlParams = [articleName,content,userId, userName, create_time];

        takeSql.addSqlFun(addSql,addSqlParams).then(res=>{
            resolve();
        }).catch(err=>{
            reject(err);
        });
    })
};

// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear(); // 年
    var month = date.getMonth() + 1; // 月
    var strDate = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minute = date.getMinutes(); // 分
    var second = date.getMinutes(); // 秒
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // 返回 yyyy-mm-dd hh:mm:ss 形式
    var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
    return currentdate;
}

module.exports = {
    'loginFun':loginFun,
    'registerFun':registerFun,
    'sendMessage':sendMessage,
    'addArticleFun':addArticleFun,
};