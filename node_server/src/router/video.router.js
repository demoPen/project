const Router = require('koa-router');
const {
  videoUploads,
  createTable,
  createInfoTable
} = require("../middleware/video.middleware")
const {
  verityToken
} = require('../middleware/auth.middleware')
const {
  videoData,
  getVideo,
  saveVideoInfo
} = require('../controller/video.controller')
const videoRouter = new Router({  prefix: '/video'})

videoRouter.post('/location',createTable,videoUploads,videoData)//本地视频上传
videoRouter.get('/:name',getVideo)

videoRouter.post('/videoInfo', verityToken,createInfoTable,saveVideoInfo)
module.exports = videoRouter