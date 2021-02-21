const http = require('http');
const queryString = require('querystring');


console.log('process.argv: ', process.argv)
const server = http.createServer(function (req, res) {
  let str = ''
  let i = 0;

  req.on('data', (data) => {
    console.log('累加: ', i++)
    str += data;
  })

  req.on('end', () => {
    console.log(typeof str, str, queryString.parse(str))
    res.write(JSON.stringify(queryString.parse(str)))
    res.end();
  })
});

server.listen(8081)