
let postMethod = require('../methods/postMethod.js');

//post请求封装
postAipFun = (pathName,result)=>{
    return new Promise((resolve,reject)=>{
        result = JSON.parse(result);
        if(pathName == '/login'){
            postMethod.loginFun(result).then(res2=>{
                let data = {
                    code: "0",
                    message: "登录成功！",
                    data:res2
                };
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        }else if(pathName == '/register'){
            postMethod.registerFun(result).then(res2=>{
                let data = {
                    code: "0",
                    message: "注册成功！"
                };
                resolve(data);
            }).catch(err=>{
                reject(err);
            })
        }else if(pathName == '/sendMessage'){
            postMethod.sendMessage(result).then(res2=>{
                let data = {
                    code: "0",
                    message: "新增成功！"
                };
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        }else if(pathName == '/addArticle'){
            postMethod.addArticleFun(result).then(res2=>{
                let data = {
                    code: "0",
                    message: "新增成功！"
                };
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        }else if(pathName == '/modifyArticle'){
            postMethod.MidfyArticleFun(result).then(res2=>{
                let data = {
                    code: "0",
                    message: "修改成功！"
                };
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        }else if(pathName == '/upImg'){
            console.log(result.name)
            postMethod.UploadImg(result).then(res2=>{
                let data = {
                    code: "0",
                    message: "上传成功！"
                };
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        }
    });
};


module.exports = postAipFun;
