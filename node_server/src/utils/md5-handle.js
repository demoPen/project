const crypto = require('crypto');//进行MD5的加密

const md5password = (password) =>{
   const md5 = crypto.createHash('md5');
   const result = md5.update(password).digest('hex')//转成十六进制
   return result
}
module.exports = md5password;