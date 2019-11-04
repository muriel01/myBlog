
const http = require('http');
const url = require('url');
const qs = require('querystring');

let formidable = require('formidable');
let util = require('util');  

let postReq = require('./httpRequest/postReq.js');
let getReq = require('./httpRequest/getReq.js');

http.createServer((req,res)=>{
    //设置跨域的域名，* 代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin','*');
    //设置header类型
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    //跨域允许的请求方式
    res.setHeader('Content-Type','application/json');

    if(req.method == 'POST'){
        console.log("\n--------POST--------");
     // 获取前端发来的路由地址
        let pathName = req.url;
        console.log(`\n接口地址为：${pathName}`);
    //   接收发送过来的参数
        let tempResule = "";
    //    读取数据
        req.addListener("data",(chunk)=>{
            tempResule += chunk;
        });
    //    数据接收完毕
        req.addListener('end',()=>{
            
            var form = new formidable.IncomingForm();  
            form.encoding = 'utf-8';
            form.uploadDir = path.join(__dirname + "/images");
            form.keepExtensions = true;//保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;
   
            form.parse(req, function(err, fields, files) {  
                console.log(files.the_file);
            });  

            // var result = JSON.stringify(qs.parse(tempResule));
            // console.log("\n参数为：");
            // postReq(pathName,result).then(res2=>{
            //     res.write(JSON.stringify(res2));
            //     res.end();
            // }).catch(err=>{
            //     res.write(JSON.stringify({
            //         code: "1",
            //         message: err,
            //     }));
            //     res.end();
            // });
        })
    }else if(req.method == 'GET'){
        console.log('\nget请求');
    //    解析url接口
        let pathName = url.parse(req.url).pathname;
        //get请求传值
        let params = url.parse(req.url, true).query;
        console.log('\n接口地址：'+pathName);

        getReq(pathName,params).then(res2=>{
            res.write(JSON.stringify(res2));
            res.end();
        }).catch(err=>{
            res.write(JSON.stringify({
                code: "1",
                message: err,
            }));
            res.end();
        })
    }
}).listen(8888);

