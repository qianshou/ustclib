/**
 * Created by zhezhao on 2016/12/20.
 */
var http = require('http');
var _url = require('url');
var cookie_path = 'cookie.tmp';
var _ = require('underscore');
var fs = require('fs');

function getImg(url, callback) {
    var urlData = _url.parse(url);
    var options = {
        "hostname":urlData.hostname,
        "path":urlData.path
    };
    var req = http.request(options,function (response) {
        //记录头文件中的cookie
        var raw_cookie = response.headers['set-cookie'][0];
        var session = raw_cookie.split(';')[0];
        fs.writeFile(cookie_path,session);
        //抓取并显示图片
        var type = response.headers["content-type"];
        var body = "";
        response.setEncoding('binary');
        response.on('end', function() {
            var data = {
                type: type,
                body: body
            };
            callback(data);
        });
        response.on('data', function(chunk) {
            if (response.statusCode == 200) body += chunk;
        });
        response.on('error', function(e){
            console.log('problem with request:'+ e.message);
        });
    });
    req.end();
};

exports.http = getImg;