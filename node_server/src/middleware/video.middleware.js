const service = require('../service/video.service')
const Multer = require('koa-multer')

const createTable = async(ctx, next) => {
  await service.createTable()
  await next()
}
const videoMulter = Multer({
  dest: './uploads/video'
})

const videoUploads = videoMulter.single('video')

module.exports = {
  videoUploads,
  createTable
}