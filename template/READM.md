
### consolidate -- 适配各种引擎模板

```
    consolidate -- 适配
    各种模板引擎整合库，使他们能共存使用
    npm:
    	https://www.npmjs.com/package/consolidate


```

> consolidate配置

```
    // 安装
    $ npm install consolidate --save-dev
    
    // 引入
    const consolidate = require('consolidate');
    
    注意：
        引入了consolidate之后，就不需要引入ejs , jade（pug）等模板引擎了；
        <!-- const jade = require('jade');
            const ejs = require('ejs'); -->
       
        但是，还是必须在安装对应要使用的ejs/pug等模板,否则会报错
        
        $ npm install ejs pug --save-dev
        
    -----------------------------------------------------------

    3.输出啥
    // set .html as the default extension 
    app.set('view engine', 'html');
    
    2.模板引擎放哪里
    app.set('views', __dirname + '/views');		
    
    // 第一个参数不能变，规定为'views'
    // 第二个参数目录及文件名可以变：
    // eg: server.set('views', './tmpl');
    
    1.使用什么模板引擎
    // assign the ejs engine to .html files 
    app.engine('html', consolidate.ejs);


```

> 实例

```
    github:
        https://github.com/glenlzk/node_demo/tree/master/06%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8Ejade%E5%92%8Cejs/11consolidate

    // ---------------------- server.js
    
    const express = require('express');
    const cookieParser = require('cookie-parser');
    const cookieSession = require('cookie-session');
    const bodyParser = require('body-parser');
    const multer = require('multer');
    const consolidate = require('consolidate');
    
    var server = express();
    
    // 1.cookie
    server.use(cookieParser('dfgdsdfwvrerer'));
    // 2.session
    let arr = [];
    
    for (let i=0; i<10000; i++) {
        arr.push('keys_' + Math.random());
    };
    server.use(cookieSession({
        name: 'session_id',
        keys: arr,
        maxAge: 3600*20
    }));
    // 3.post数据
    server.use(bodyParser.urlencoded({
        extend: false
    }));
    server.use(multer({dest: './www/upload'}).any());
    
    // 4.static
    server.use(express.static('./www'));
    
    // 5.模板引擎
    // 输出什么
    server.set('view engine', 'html');
    // 模板在哪
    server.set('views', './tmpl');
    // 使用哪种引擎
    server.engine('html', consolidate.ejs);
    
    server.use('/index', (req, res) => {
        res.render('index.ejs', {name: 'glen'});
        // res.render() 类似于 res.send();
        // 把编译的结果，发送给用户
    });
    
    server.listen(8888);


    // ---------------------- './tmpl/index.ejs'
    
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        我是<%= name %>
    </body>
    </html>




```