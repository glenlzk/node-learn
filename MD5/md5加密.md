
> MD5加密基础实例

```js
 
    // 引入node内置加密模块 crypto
    const crypto=require('crypto');
    
    // 选择加密模式 md5
    var obj=crypto.createHash('md5');
    
    // 输入加密字符串
    obj.update('123456');
    
    // 获取16进制加密结果
    var str=obj.digest('hex');
    
    // 输出结果
    console.log(str);

```

> MD5加密封装

```js
    
    
    // common.js
    const crypto=require('crypto');
    
    module.exports={
      // 自定义加密 密钥  防破解
      MD5_SUFFIX: 'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)',
      md5: function (str){
        var obj=crypto.createHash('md5');
    
        obj.update(str + this.MD5_SUFFIX);
    
        return obj.digest('hex');
      }
    };
    
    
    // 引入
    const common = require('./common.js');
    
    const str  = common.md5('12345');
    
    console.log(str)
    
    

```