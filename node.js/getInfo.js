/**
 * Created by zhezhao on 2016/12/20.
 */
var http = require('http');
var url = require('url');
var cookie_path = 'cookie.tmp';
var fs = require('fs');

function getInfo() {
    var _url = url;
    var _http = http;
    this.http = function(url, callback) {
        fs.readFile(cookie_path, 'utf-8', function (err, data) {
            var urlData = _url.parse(url);
            var options = {
                hostname: urlData.hostname,
                path: urlData.path,
                method: 'GET',
                headers: {'Cookie': data}
            };
            var req = http.request(options,function (response) {
                var body = "";
                response.on('end', function() {
                    callback(body);
                    console.log(body);
                });
                response.on('data', function(chunk) {
                    if (response.statusCode == 200) body += chunk;
                });
            });
            req.end();
        });
    }
};

module.exports = getInfo;