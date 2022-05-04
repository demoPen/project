const Router = require('koa-router');
const {
  videoUploads,
  createTable,
  createInfoTable,
  createiframe
} = require("../middleware/video.middleware")
const {
  verityToken
} = require('../middleware/auth.middleware')
const {
  videoData,
  getVideo,
  saveVideoInfo,
  getYY,
  deleteById,
  saveiframe,
  getIframe,
  deleteIframe
} = require('../controller/video.controller')
const videoRouter = new Router({  prefix: '/video'})

videoRouter.post('/location',createTable,videoUploads,videoData)//本地视频上传
videoRouter.get('/base/:name',getVideo)//将生成的地址回显出来

videoRouter.post('/videoInfo', verityToken,createInfoTable,saveVideoInfo)//本地视频的所有信息
videoRouter.get('/videoInfo',getYY)
videoRouter.delete('/videoInfo',verityToken,deleteById)

videoRouter.post('/iframeInfo',verityToken,createiframe,saveiframe)
videoRouter.get('/iframeInfo',getIframe)
videoRouter.delete('/iframeInfo',verityToken,deleteIframe)
module.exports = videoRouter