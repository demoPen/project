const mysql = require('mysql2');
const config = require('./config')
const connection = mysql.createPool({
  host:config.MYSQL_HOST,
  port:config.MYSQL_PORT,
  user:config.MYSQL_ROOT,
  database:config.MYSQL_DATABASE,
  password:config.MYSQL_PASSWORD
})

connection.getConnection((err,connect)=>{
  connect.connect(err=>{
    if(err) console.log(`数据库连接失败`);
    else console.log(`数据库连接成功`);
  })
})
module.exports = connection.promise()