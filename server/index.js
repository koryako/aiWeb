import express from "express";
//const express =require("express");
const routes = require('./routes/index.js')
var request = require('request');
var config=require('./config.js');
//var jwt=require('jsonwebtoken');
var jwc=require('./jwc.js')
var url = require('url');
const app=express();
app.engine('html', require('ejs').renderFile);
app.set("view engine","html");
const apiRoutes=express.Router();
apiRoutes.use((req,res,next)=>{
    let token= req.headers['authorization'];
  /*  if (token){
       let payload=jwc.parse(token)['payload'];
        let code=payload['user_name'];

        let fullUrl=url.format({
            protocol: req.protocol,
            host: config.url||req.get('host'),
            pathname: req.originalUrl
          });

          fullUrl=fullUrl.split('?')[0];
         
       // let fullUrl="http://10.1.190.224:82/otp-pss-itf-routingrules/routingRules/productRules/queryByPage";//req.originalUrl;
        let authServer=config.authServer;
        let appName=config.serviceName;
        const method="POST";
        const checkPermissionPath="/checkPermission/hasPermission";
        let apiUrl="";
        apiUrl+=authServer;
        apiUrl+=checkPermissionPath;
        apiUrl+="?path=";
        apiUrl+=fullUrl;
        apiUrl+="&userId=";
        apiUrl+=code;
        apiUrl+="&serviceName=";
        apiUrl+=encodeURI(appName);
        apiUrl+="&method=";
        apiUrl+=method;
       // console.log(apiUrl);

       console.log(apiUrl);
        request({　　
          　　　　url: apiUrl,
          　　　　method: 'GET'
                }, (error, response, data)=> {
                    if (response.statusCode==200){
                        if (data=="true"){
                           console.log(data);
                            next();//成功路由
                        }else{
                            console.log(data);
                            return res.status(401).send({
                                success:false,
                                message:'未授权.'
                            });
                        }
                    }else{
                        return res.status(404).send({
                            success:false,
                            message:'Full authentication is required to access this resource.'
                        });
                    }
                });
    }else{
        return res.status(403).send({
            success:false,
            message:'没有找到token.'
        });
    }*/
    next();//成功路由
});

app.use('/',routes(apiRoutes));

app.listen(3001,()=>{
    console.log('服务器启动');
})