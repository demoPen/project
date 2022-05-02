const service = require('../service/video.service')
const Multer = require('koa-multer')

const createTable = async(ctx, next) => {
  await service.createTable()
  await next()
}
// const videoMulter = Multer({
//   dest: './uploads/video'
// })

var storage = Multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
      cb(null, './video')  //注意路径必须存在
  },
  //修改文件名称
  filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
const file = Multer({storage:storage})
const videoUploads  = file.single('video')
const createInfoTable = async(ctx,next) =>{
  await service.createInfoTable()
  await next()
}
module.exports = {
  videoUploads,
  createTable,
  createInfoTable
}