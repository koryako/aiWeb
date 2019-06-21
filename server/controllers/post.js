var http = require('http');
var querystring = require('querystring');

var data =  querystring.stringify({
    url: 'http://www.sohu.com'
   
});

var options = {
    hostname: 'http://dwz.cn',
       // port: 80,
        path: '/create.php',
      method: 'POST',
     headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
};
var req = http.request(options,function(res){
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
        console.log(returnDataata);
    });
});
//如果有错误会输出错误
req.on('error', function(e){
     console.log('错误：' + e.message);
});
req.write(data);
req.end();
