/**
 * Created by zhezhao on 2016/12/20.
 */
var http = require('http');
var url = require('url');
var cookie_path = 'cookie.tmp';
var fs = require('fs');
var querystring = require('querystring');
var getInfo = require('./getInfo');

function curlServer() {
    var _url = url;
    var _http = http;
    this.http = function(url,postData, callback) {
        postData.select = "bar_no";
        postData = querystring.stringify(postData);
        var urlData = _url.parse(url);
        fs.readFile(cookie_path,'utf-8',function (err, data) {
            var options = {
                hostname:urlData.hostname,
                path:urlData.path,
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie':data
                }
            };
            var req = http.request(options,function (response) {
                if(response.statusCode == 302){
                    var obj = new getInfo;
                    obj.http('http://opac.lib.ustc.edu.cn/reader/book_lst.php',function (body) {
                        callback(body);
                    });
                }else{
                    callback('login fail!');
                }
            });
            req.write(postData);
            req.end();
        });
    };
};

module.exports = curlServer;