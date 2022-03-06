const jwt = require('jsonwebtoken');
const {
  PRIVATE_KEY
} = require('../app/config')

class LoginController{
  
  async signToken(ctx,next){
    const { id ,name} = ctx.adminInfo;
    const token = jwt.sign({id,name},PRIVATE_KEY,{
      algorithm:'RS256',
      expiresIn: 60*60*24
    });
    ctx.body = {id,name,token,'msg':'登录成功'}
  }
}
module.exports = new LoginController()