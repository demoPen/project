const jwt = require("jsonwebtoken");

const { PUBLIC_KEY } = require("../app/config");
const md5password = require("../utils/md5-handle");
const service = require("../service/admin");
const errorTypes = require("../constants/error-type");
const verifyLogin = async (ctx, next) => {
  //验证登录
  const { name, password } = ctx.request.body;

  //判断用户名和密码是否正确
  const result = await service.getUserInfoByname(name);
  if (result === undefined) {
    const error = new Error(errorTypes.USER_NAME_IS_NOT_EXIST);
    return ctx.app.emit("error", error, ctx);
  };

  if (md5password(password) !== result.password) {
    const error = new Error(errorTypes.USER_NAME_OR_PASSWORD_ERROR);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.adminInfo = result;
  await next();
};

const verityToken = async (ctx, next) => {
  console.log("我是验证token的中间件");
  try {
    const authorization = ctx.headers.authorization;
    const token = authorization.replace("Bearer", "");

    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    ctx.result = result; //把信息保存到对象中
    await next();
  } catch (err) {
    const error = new Error(errorTypes.TOKEN_AUTHENTICATION_FAILED);
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verityToken,
};
