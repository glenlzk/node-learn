
### form表单上传文件功能实现

> 参考链接

```
    Nodejs进阶：基于express+multer的文件上传---------可深入了解相关功能
    
        http://www.cnblogs.com/chyingp/p/express-multer-file-upload.html
    
    multer
        https://github.com/expressjs/multer
        
        
     enctype="multipart/form-data" : 	解析post文件        解析库multer
    application/x-www-form-urlencoded： 解析post数据,默认   解析库body-parser

```

> body-parser缺

它只能解析普通post数据，它解析不了文件上传的数据

```

const express=require('express');
const bodyParser=require('body-parser');

var server=express();
// 只能解析urlencode数据，解析不了multipart数据（即文件上传，拆多包上传的数据）
server.use(bodyParser.urlencoded({extended: false}));  

server.post('/', function (req, res){
  
  console.log(req.body)
  
});

server.listen(8080);


```

> 基础知识脑补


```
    // --------------------------
    
    form表单上传文件时，必须要在标签上声明：enctype="multipart/form-data"
    
   <form action="http://localhost:8181/upload" method="post" enctype="multipart/form-data">
        文件名<input type="file" name="f1"/><br/>
        <input type="submit" value="上传">
    </form>
    
    enctype="multipart/form-data" : 	解析post文件
    application/x-www-form-urlencoded： 解析post数据,默认
    
    // --------------------------
    
    express中间件：
    
        var bodyParser = require('body-parser');
        var multer = require('multer');
    
        body-parser	解析post数据	application/x-www-form-urlencoded
            只能处理urlencoded数据
            
        multer		解析post文件	multipart/form-data
        
        ------------------------------- multer
    
        // 注册中间件
        // dest 表示要存放的路劲
        // .any() 表示接受任何文件类型 
        server.use(multer({dest: './www/upload'}).any());
        
        server.use('/upload', function (res, res) {
            console.log(req.file, req.files);
        });
        
        ----------------------------------body-parser
    
        // github:https://github.com/expressjs/body-parser
        // method: 'post'
        
         // 注册中间件
        let postData = bodyParser.urlencoded({
            extended: false,         // 是否可扩展
            limit: 100*1024          // 限制最大的上传大小 Defaults to '100kb'
        });
        
        server.use(postData);       // 先注册使用中间件，才会有以下: req.body
        
          server.use('/', function (res, res) {
            console.log(req.body);
        });
    
    // -------------------------------------------
    
    const path = require('path');

    var url = "http://localhost:8080/upload/CAM00084.jpg"
    
    console.log(path.parse(url));
    
    { 
      root: '',
      dir: 'http://localhost:8080/upload',
      base: 'CAM00084.jpg',
      ext: '.jpg',
      name: 'CAM00084' 
    }


```

> 实例

```
    github:
        https://github.com/glenlzk/node_demo/tree/master/07%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E5%8A%9F%E8%83%BD%E5%AE%9E%E7%8E%B0/01demo

    // --------------------------- './upload_server.js'
    
    const express = require('express');
    const fs = require('fs');
    const urlLib = require('url');
    const multer = require('multer');
    const path = require('path');
    
    let server = express();
    
    server.listen(8181);
    
    // 注册中间件
    // './www/upload'下的文件必须自己提前定义好，否则multer不会自动创建
    server.use(multer({dest: './www/upload'}).any());
    
    
    // 这个必须放在之前，下面的路劲才能访问到: http://localhost:8181/upload.html
    // 相当于在server.use里使用：var newPath = './www' + oUrl.pathname;
    server.use(express.static('./www'));
    
    // upload的请求，响应
    server.use('/upload',function (req, res) {
        // 获取上传文件对象
        let fileList = req.files;   // console.log(req.files)
        // 重新命名文件名
        let newName = fileList[0].path + path.parse(fileList[0].originalname).ext;
        console.log(newName, req.files);
    
        // 重命名文件
        fs.rename(fileList[0].path, newName, function (err, data) {
            if (err) {
                res.write('上传失败');
            } else {
                res.write('上传成功');
            }
            res.end();
        });
    });
    
    // 所有文件请求，响应，
    // 例如：http://localhost:8181/upload  如果放在前面则会返回404且 res.end();
    // server.use('/upload', function () {})如果放在后面则无法执行
    // 所以，此文件相应必须放最后面
    server.use(function (req, res) {
        let oUrl = urlLib.parse(req.url, true);
        // 不加返回，如果请求得到对应静态文件，则会成功返回；如果请求不到对应文件，
        // 则浏览器会一直转圈处于请求状态之中，所以，不管请求成功与否，建议都要给返回值
        fs.readFile(oUrl.pathname, function (err, data) {
            if (err) {
                res.write('404');
            } else {
                res.write(data);
            };
            res.end();
        });
    });


    // ------------------------------------------'./www/upload.html'
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    <form action="http://localhost:8181/upload" method="post" enctype="multipart/form-data">
        文件名<input type="file" name="f1"/><br/>
        <input type="submit" value="上传">
    </form>
    </body>
    </html>


```