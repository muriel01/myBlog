
let takeSql = require('../sql.js');

//获取留言信息
getMessageFun=()=>{
    return new Promise((resolve,reject)=>{
        let readSql = "SELECT * FROM message";
        takeSql.searchSqlFun(readSql).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
};

//文章详情
articleInfoFun = (articleId)=>{
    return new Promise((resolve,reject)=>{
        let readSql = "SELECT * FROM article WHERE id="+articleId;
        takeSql.searchSqlFun(readSql).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
};

//文章列表
articleListFun = ()=>{
    return new Promise((resolve,reject)=>{
        let readSql = "SELECT * FROM article";
        takeSql.searchSqlFun(readSql).then(res=>{
            console.log(res);
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
};

//删除文章
delArticleFun = (id)=>{
    return new Promise((resolve,reject)=>{
        console.log(id)
        let readSql = `DELETE FROM article where id=${id}`;
        takeSql.delSqlFun(readSql).then(res=>{
            console.log(res);
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
};

module.exports = {
    'getMessageFun':getMessageFun,
    'articleInfoFun':articleInfoFun,
    'articleListFun':articleListFun,
    'delArticleFun':delArticleFun,
};
