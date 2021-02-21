
### route-路由

```
    route-路由：---------内置express
    把不同的目录，对应到不同的模块
    
    server.get();
    server.use()
    server.post()
    
    Router-------迷你server
    
    router.get();
    router.post();
    router.use();
    
    xxxx.com/aaa/		mod1
    xxxx.com/news/	    mod_news	// 子模块
    	post			    news_post
    	list			    news_list
    	content		        news_content
    xxxx.com/user/		mod_users

```

> 子路由嵌套

```
    Router——express server子服务
    
    // 创建路由
    var router1=express.Router();
    // 使用路由
    server.use('/user', router1);
    
    // 创建路由
    var r=express.Router();					// 嵌套子路由
    // 子路由嵌套
    router1.use('/user_mod', r);
    router1.use('/user_reg', function (){});
    
    http://www.xxxx.com/user/user_mod
    http://www.xxxx.com/user/user_reg
    http://www.xxxx.com/user/user_login
    
    // 创建路由
    var router2=express.Router();
    // 使用路由
    server.use('/news', router2);
   
    http://www.xxxx.com/news/list
    http://www.xxxx.com/news/post
    http://www.xxxx.com/news/content
    
    // 创建路由
    var router3=express.Router();
    // 使用路由
    server.use('/item', router3);
    
    http://www.xxxx.com/item/buy
    http://www.xxxx.com/item/mod
    http://www.xxxx.com/item/del


```

> 实例

```
    
    github:
        https://github.com/glenlzk/node_demo/tree/master/08express路由
    
    // --------------------------- server.js
    
    
    const express = require('express');
    
    var server = express();
    
    // ------------ 目录1： /user
    // 创建路由
    routerUser = express.Router();
    // 使用路由
    server.use('/user', routerUser);
    
    routerUser.get('/mod1', (req, res) => {
        res.send('user -------- mod1');
    });
    
    routerUser.get('/mod2', (req, res) => {
        res.send('user -------- mod2');
    });
    
    // ------------ 目录2：/article
    
    // 创建路由
    routerAticle = express.Router();
    // 使用路由
    server.use('/article', routerAticle);
    
    routerAticle.get('/mod1', (req, res) => {
        res.send('article -------- mod1');
    });
    
    routerAticle.get('/mod2', (req, res) => {
        res.send('article -------- mod2');
    });
    
    
    server.listen(8888);


```