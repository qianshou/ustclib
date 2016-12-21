var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var IMGS = require('./getImg');
var CURL = require('./makeCurl');

http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var path = pathname.substr(1);
    switch(path){
        case 'curl':
            var post = '';
            req.on('data', function(chunk){
                post += chunk;
            });
            req.on('end', function(){
                postData = querystring.parse(post);
                CURL.http('http://opac.lib.ustc.edu.cn/reader/redr_verify.php',postData,function (body) {
                    res.write(body);
                    res.end();
                });
            });
            break;
        case 'img':
            //显示验证码
            IMGS.http('http://opac.lib.ustc.edu.cn/reader/captcha.php', function(data) {
                res.writeHead(200, {"Content-Type": data.type});
                res.write(data.body, "binary");
                res.end();
            });
            break;
        default:
            //显示登陆页面
            fs.readFile(__dirname + '/login.html',function (err, data) {
                    res.writeHead(200);
                    res.end(data);
                });
    }
}).listen(3000);
console.log('http://127.0.0.1:3000');