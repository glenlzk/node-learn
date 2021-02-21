
### package.json配置

> 参阅链接

```
    
    http://javascript.ruanyifeng.com/nodejs/packagejson.html#toc1

```

> main字段

```
    main字段指定了加载的入口文件，require('moduleName')就会加载这个文件。
    这个字段的默认值是模块根目录下面的index.js。


    // 实例：
    // mint-ui package.json
    // main:lib/mint-ui.common.js
    {
      "name": "mint-ui",
      "version": "2.2.9",
      "description": "Mobile UI elements for vue.js",
      "keywords": [
        "component",
        "vue",
        "mobile",
        "eleme"
      ],
      "main": "lib/mint-ui.common.js",
      "style": "lib/style.css",
      "author": "elemefe",
      "license": "MIT",
      "dependencies": {
        "array-find-index": "^1.0.2",
        "raf.js": "0.0.4",
        "vue-lazyload": "^1.0.1"
      },
      "peerDependencies": {
        "vue": "^2.3.0"
      },
      "devDependencies": {
      }
    }
    
    // 注册mint-ui
    // 项目main.js
    
    import Vue from 'vue';
    import Mint from 'mint-ui';             // 自动加载"main": "lib/mint-ui.common.js"
    import 'mint-ui/lib/style.css';
    
    Vue.use(Mint);



```

> webpack script命令配置

```
    
    运行 webpack

        webpack 的执行也很简单，直接执行
        
        $ webpack --display-error-details
        
        即可，后面的参数“--display-error-details”是推荐加上的，方便出错时能查阅更
        详尽的信息（比如 webpack 寻找模块的过程），从而更好定位到问题。
        
        其他主要的参数有：
        
        $ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
        
        $ webpack --watch   //监听变动并自动打包
        
        $ webpack -p    //压缩混淆脚本，这个非常非常重要！
        
        $ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
       
        其中的 -p 是很重要的参数，曾经一个未压缩的 700kb 的文件，压缩后直接降到
        180kb（主要是样式这块一句就独占一行脚本，导致未压缩脚本变得很大）。

```

> npm script命令配置和使用

```
    参阅链接：
        npm scripts 使用指南
        http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
        
        https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
        https://github.com/RyanZim/awesome-npm-scripts#articles
        
    查看全局变量环境配置：
        webpack工程的js中打印：
            
            console.log(process.env);
    
    -------------------------------------------------------------------
    
    传参
    
        'test': 'node_modules/mocha/bin/_mocha'
    
        $ npm test --xx.js,实际执行 node_modules/mocha/bin/_mocha xx.js

    ------------------------------------------------------------------
    
    执行顺序
        如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。
        如果是并行执行（即同时的平行执行），可以使用&符号。
        
        $ npm run script1.js & npm run script2.js
        如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。
        
        $ npm run script1.js && npm run script2.js
    
    -----------------------------------------------------------------
    
    钩子
        npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。

        "prebuild": "echo I run before the build script",
        "build": "cross-env NODE_ENV=production webpack",
        "postbuild": "echo I run after the build script"
        
        用户执行npm run build的时候，会自动按照下面的顺序执行。
        
        npm run prebuild && npm run build && npm run postbuild
        
        因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。
        
        "clean": "rimraf ./dist && mkdir dist",
        "prebuild": "npm run clean",
        "build": "cross-env NODE_ENV=production webpack"
        
    备注：cross-env - Set environment variables for scripts, unix-style.
    
    -------------------------------
    
    npm scripts设置环境变量方法
    
    -------- windows
    
    set NODE_ENV=production
    
    "scripts": {
        "release": "set NODE_ENV=production && gulp rtm",
        "dev": "set NODE_ENV=development && gulp watch",
    }
   
    -------- linux & mac
    
    export NODE_ENV=production
    
    "scripts": {
        "release": "NODE_ENV=production gulp rtm",
        "dev": "NODE_ENV=development gulp watch",
    }
    
    -------- cross-env跨平台设置
    
    npm i cross-env -D
    
    "scripts": {
        "release": "cross-env NODE_ENV=production gulp rtm",
        "dev": "cross-env NODE_ENV=development gulp watch",
    }
    
    
    -------------------------------------------------------------------------
    >   writes the stdout of a command to a file. (do-something > file)
    
    stdin是标准输入文件，stdout是标准输出文件，stderr标准出错文件
    
    
    "devDependencies": {
      "jshint": "latest",
      "stylus": "latest",
      "browserify": "latest"
    },
    "scripts": {
      "lint": "jshint **",
      "build:css": "stylus assets/styles/main.styl > dist/main.css",
      "build:js": "browserify assets/scripts/main.js > dist/main.js",
      "build": "npm run build:css && npm run build:js",
      "prebuild:js": "npm run lint"
    }
    
    "build:css": "stylus assets/styles/main.styl > dist/main.css",
    目录下的：assets/styles/main.styl 文件转化为css,输出为main.css
    
    ----------------------------------------------------------------------
    < sends the contents of a file to a command's stdin. (command < file)
    
    "devDependencies": {
      "autoprefixer": "latest",
      "cssmin": "latest"
    },
    "scripts": {
      "build:css": "autoprefixer -b 'last 2 versions' < assets/styles/main.css | cssmin > dist/main.css"
    }
    
    As you can see autoprefixer adds the CSS vendor prefixes to our CSS, which 
    is then piped to cssmin which minifies the output - then the whole thing 
    gets dumped into dist/main.css. Most good tools will support stdin and stdout 
    and the above code is fully compatible with Windows, Mac and Linux.
    
    -----------------------------------------------------------------
    变量
        
        环境变量process.env对象
        
        1. npm_package_前缀，npm 脚本可以拿到package.json里面的字段
            {
              "name": "foo", 
              "version": "1.2.5",
              "scripts": {
                "view": "node view.js"
              }
            }
            
            // npm_package_name == foo
            // js里可以通过：
            // view.js
            console.log(process.env.npm_package_name); // foo
            console.log(process.env.npm_package_version); // 1.2.5
            
           
            
        2.在package.json里，可以通过$npm_package变量拿到package.json里的东西
        
          "repository": {
            "type": "git",
            "url": "xxx"
          },
          scripts: {
            "view": "echo $npm_package_repository_type"
          }
    
    ----------------------------------------------------------------------------
        
    常用脚本示例
        
    // 删除目录
    "clean": "rimraf dist/*",
    
    
    cross-env - Set environment variables for scripts, unix-style.
    
    eg: 
        "build": "cross-env NODE_ENV=production webpack"
    
    echo-cli - Cross-platform echo with JS escape sequence support.
    clear-cli - Clear the terminal.
    
```