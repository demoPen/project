const Router = require('koa-router');
const {
  videoUploads,
  createTable
} = require("../middleware/video.middleware")
const {
  verityToken
} = require('../middleware/auth.middleware')

const videoRouter = new Router({  prefix: '/video'})

videoRouter.post('/location',verityToken,createTable,videoUploads)
module.exports = videoRouter