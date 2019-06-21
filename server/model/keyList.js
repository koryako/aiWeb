var mysql = require('mysql');
const DB_NAME="quicklink"

var pool  = mysql.createPool({
  host   : '10.1.190.224',
  user   : 'root',
  password : 'root',
  port:'3306',
  //database:'quicklink'
});

pool.on('connection', function(connection) {  
 
    console.log('succeed!')
  //connection.query('SET SESSION auto_increment_increment=1'); 
});  

function KeyList(user){
  //this.username = user.username;
 // this.userpass = user.userpass;
};


pool.getConnection(function(err, connection) {

  var useDbSql = "USE " + DB_NAME;
  connection.query(useDbSql, function (err) {
     if (err) {
      console.log("USE Error: " + err.message);
      return;
     }
     console.log('USE succeed');
  });

  //保存数据
  KeyList.prototype.getlist = function getlist(callback) {
  //  var user = {
   //   username: this.username,
    //  userpass: this.userpass
   // };

    var insertUser_Sql = "SELECT * FROM keylist";

    connection.query(insertUser_Sql, function (err,result) {
      if (err) {
        console.log("insertUser_Sql Error: " + err.message);
        return;
      }

      connection.release();

      console.log("invoked[save]");
      callback(err,result);                                      
    });    
  };
/*
  //根据用户名得到用户数量
  User.getUserNumByName = function getUserNumByName(username, callback) {

    var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM userinfo WHERE username = ?";

    connection.query(getUserNumByName_Sql, [username], function (err, result) {
      if (err) {
        console.log("getUserNumByName Error: " + err.message);
        return;
      }

      connection.release();

      console.log("invoked[getUserNumByName]");
      callback(err,result);                                      
    });         
  };

  //根据用户名得到用户信息
  User.getUserByUserName = function getUserNumByName(username, callback) {

    var getUserByUserName_Sql = "SELECT * FROM userinfo WHERE username = ?";

    connection.query(getUserByUserName_Sql, [username], function (err, result) {
      if (err) {
        console.log("getUserByUserName Error: " + err.message);
        return;
      }

      connection.release();

      console.log("invoked[getUserByUserName]");
      callback(err,result);                                      
    });         
  };
 */
});








module.exports = KeyList;
