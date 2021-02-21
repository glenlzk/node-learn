
const express = require('express');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const consolidate = require('consolidate');

const server = express();

server.use(bodyParser.urlencoded({
  extended: false,
  limit: 2 * 1024 * 1024
}))

const upload = multer({ dest: '/upload' })

/* server.use(upload.any())

server.post('/upload', (req, res) => {
  console.log('req.file: ', req.file)
  console.log('req.body: ', req.body)
  res.send('上传成功').end();
}) */

server.use(cookieParser());

const keys = [];
for (let i = 0; i < 100000; i++) {
  keys.push('sdfdgwer_' + Math.random())
}

server.use(cookieSession({
  name: 'glen',
  keys: keys,
  maxAge: 30 * 60 * 1000
}))

// 输出啥
server.set('view engine', 'html')
// 模板引擎放哪里
server.set('views', './template')
// 使用啥模板引擎渲染
server.engine('html', consolidate.ejs)

server.use(function (req, res, next) {
  console.log('req.url: ', req.url)
  console.log('req.body: ', req.body)
  console.log('req.cookie.session_id: ', req.cookies.session_id)
  const session_id = req.cookies.session_id;

  if (session_id && req.session[session_id]) {
    // 已登陆
    if (['/', '/index.html'].includes(req.url)) {
      res.redirect('/logined.html')
    } else {
      console.log('已经登陆....')
      next();
    }
  } else {
    // 未登录
    if (['/', '/index.html'].includes(req.url)) {
      console.log('渲染登陆页;')
      // return 解决Error: Can't set headers after they are sent
      return res.render('index.ejs', {
        userError: '',
        passwordError: ''
      })
    } if (req.url === '/login') {
      next();
    } else {
      res.redirect('/')
    }
  }
})

const userTable = {
  glen: '123456'
}


server.use('/login', (req, res, next) => {
  const { user, password } = req.body;
  if (userTable[user]) {
    if (userTable[user] === password) {
      const _t = String(new Date().getTime());
      res.cookie('session_id', _t, {
        path: '/',
        maxAge: 30 * 60 * 1000
      })
      // 用户登录
      req.session[_t] = true;
      res.redirect('/logined.html')
    } else {
      console.log('密码输入错误;')
      return res.render('index.ejs', {
        userError: '',
        passwordError: '密码输入错误;'
      })
    }
  } else {
    console.log('该用户不存在....')
    return res.render('index.ejs', {
      userError: '该用户不存在;',
      passwordError: ''
    })
  }
})

server.use(express.static('./www'))
server.listen(8080);