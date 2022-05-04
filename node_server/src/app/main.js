const koa = require('koa');
const bodyparser = require('koa-bodyparser')
const koarange = require('koa-range')
const cors = require('koa2-cors')

const useRouter = require('../router/index');
const errorHandler = require('./error-handle');
const app = new koa();
app.use(cors())
app.useRouter = useRouter;
app.use(bodyparser())
app.useRouter();
app.on('error',errorHandler)//监听错误信息
app.use(koarange)

module.exports = app;