let getMethod = require('../methods/getMethod');
const fs = require('fs');
let path = require('path');


let data = {
    code: "0",
    message: "操作成功！"
};

getReq=(pathName,params)=>{
    return new Promise((resolve,reject)=>{
        if(pathName == '/index'){
            console.log('\n首页：');
            pathName = 'index.html';
            let extName = path.extname(pathName);
            console.log('\n首页：');
            fs.readFile('../web/'+ pathName ,(err,data)=>{
                if(err){
                    reject(err);
                }else {
                    // 获取文件类型
                    let ext = getExt(extName);
                    console.log(ext);
                    res.writeHead(200,{
                        "Content-Type":  ext +"; charset='utf-8'"
                    });
                    res.write(data);
                    res.end();
                }
            })
        }else if(pathName == '/getMessage'){
            console.log('\n获取留言信息');
            getMethod.getMessageFun().then(res2=>{
                data.data = res2;
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        }else if(pathName == '/articleInfo'){
            getMethod.articleInfoFun(params.articleId).then(res2=>{
                data.data = res2;
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        }else if(pathName == '/articleList'){
            getMethod.articleListFun().then(res2=>{
                data.data = res2;
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        }else if(pathName == '/delArticle'){
            console.log(params)
            getMethod.delArticleFun(params.id).then(res2=>{
                data.data = res2;
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        }
    });
};


// 获取后缀名
getExt = (extName) => {
    // readFile 是异步操作，所以需要使用 readFileSync
    let data = fs.readFileSync('./08_ext.json');
    let ext = JSON.parse(data.toString());
    return ext[extName];
};

module.exports = getReq;
