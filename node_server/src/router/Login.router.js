const Router = require('koa-router');

const {createTable} = require('../middleware/login.middleware');
const { signToken} = require('../controller/Login.controller');
const { verifyLogin } = require('../middleware/auth.middleware')

const loginRouter = new Router({prefix:'/login'})

loginRouter.post('/',createTable, verifyLogin,signToken);

module.exports = loginRouter;