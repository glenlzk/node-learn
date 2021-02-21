
### cmd文件和bat文件替换npm 命令行


> cmd文件作用 > 顶替npm run ***

```
    //--------------------------- 基础
    
    在项目根目录下，直接创建一个cmd文件，如
        build.cmd
        
    则，在命令行中，可以直接运行：
        $ build
        
    这样，就可以运行 build.cmd文件里的内容
    
    //---------------------------创建build.cmd文件,并运行相关指令
        $ type null>build.cmd
        
    build.cmd文件内容：
        node build/build.js
        
    当我们运行:
        $ build 
        
    此时运行的即是：
        $ node build/build.js
        
    // ------------- 深入理解.cmd文件
    具体参阅:
        es6 > 搭建babel环境
    
    
     babel-node.cmd写入：
            "%*" 表示即将要运行的后续文件,变量
            .\node_modules\.bin\babel-node %*
            
    命令行此时使用babel-node: 运行的就是babel-node.cmd文件里的命令:
        $ babel-node example.js (%*变量指的就是example.js)
        
        
    深入理解变量：
        %*
        %1
        %2
        
        // ---------  实例1：
        // babel-node.cmd配置:
        node_modules\.bin\babel-node %*
        
        $ babel-node example.js
        
        // ---------  实例2:
        // babel-node.cmd配置:
        node_modules\.bin\babel %1 --presets es2015  -o %2
        
        
        $ babel-node example.js compiled.js         // ---> exmaple.js => %1位置1； compiled.js => %2位置2

```

> .bat文件 ----- 双击直接运行文件夹里的命令

```
    1.创建.bat文件
        type null>.bat
        
    2.打开.bat文件，输入以下内容，保存：
        node build/build.js
        
    3.双击.bat文件，会直接运行.bat文件里的内容

```