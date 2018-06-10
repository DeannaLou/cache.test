var http = require('http');
var fs = require('fs');
var md5 = require('js-md5');
/**
 * 测试浏览器缓存
 */

http.createServer(function (req, res) {
  if (req.url === '/' || req.url === '' || req.url === '/index.html') {
    fs.readFile('./index.html', function (err, file) {
      //对主文档设置缓存，无效果
      res.setHeader('Cache-Control', "max-age=" + 5);
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Etag', "ffff");
      res.writeHead('200', "OK");
      res.end(file);
    });
  }
  if (req.url === '/src/xmlHttp.js') {
    fs.readFile('./src/xmlHttp.js', function (err, file) {
      res.setHeader('Cache-Control', "max-age=" + 50000);
      res.setHeader('Content-Type', 'text/plain');
      res.end(file);
    });
  }
  if (req.url === '/img/girl_20.jpg') {
    fs.readFile('./img/girl_20.jpg', function (err, file) {
      if (!req.headers['if-none-match']) {
        res.setHeader('Cache-Control', "no-cache, must-revalidate, max-age=" + 50000);
        res.setHeader('Content-Type', 'images/png');
        res.setHeader('Etag', "ffff");
        res.writeHead('200', "no etag");
        res.end(file);
      } else {
        if (req.headers['if-none-match'] === 'ffff') {
          res.writeHead('304', "Not Modified");
          res.end();
        } else {
          res.setHeader('Cache-Control', "no-cache, max-age=" + 5);
          res.setHeader('Content-Type', 'images/png');
          res.setHeader('Etag', "ffff");
          res.writeHead('200', "OK");
          res.end(file);
        }
      }
    });
  }
  if (req.url === '/info') {
    fs.readFile('./data/info.txt', function (err, file) {
      if (!req.headers['if-none-match']) { // 如果没有 etag 信息
        res.setHeader('Cache-Control', "max-age=5, no-cache");
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Etag', md5(file));
        res.setHeader('Last-modified', new Date());
        res.writeHead('200', "");
        res.end(file);
      } else { // 如果有
        if (req.headers['if-none-match'] === md5(file)) { // === ffff
          res.writeHead('304', "Not Modified");
          res.end(); // 使用缓存
        } else { // 缓存无效了
          res.setHeader('Cache-Control', "max-age=5, no-cache");
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Etag', md5(file));
          res.setHeader('Last-modified', new Date());
          res.writeHead('200', "OK");
          res.end(file);
        }
      }
    });
  }
}).listen(8989, "127.0.0.1", function() {
  console.log("Server running at http://localhost:8989/");
});