/**
* @api {post} /customlink/keylist 请求可以自定义的按钮列表
* @apiName keylist
* @apiGroup keylist
*
* @apiParam {Number} null 没有.
*
* @apiSuccess {String} keyid 按钮的唯一标识.
* @apiSuccess {String} keyName 按钮的中文名称.
*
* @apiSuccessExample Success-Response:
* HTTP/1.1 200 OK
* data:[{
* "keyid": "query",
* "keyName": "查询"
* }]
*
* @apiError UserNotFound The id of the User was not found.
*
* @apiErrorExample Error-Response:
* HTTP/1.1 404 Not Found
* {
* "error": "发生错误"
* }
*/

//apidoc -f ".*\\.js$" -i ./controllers -o doc/

const keyListModel=require('../model/keyList.js');
module.exports={

    get:(req,res)=>{

        let data=[];
        let keylist=new keyListModel('dd')
        keylist.getlist(function(err,rows){
                console.log(rows);
                for(var i=0; i < rows.length; i++) {
                    data[i] = {
                        keyid: rows[i].keyid,
                        keyName: rows[i].keyName,
                    }
                  }

                  res.json(data);
        })
        
    }
}