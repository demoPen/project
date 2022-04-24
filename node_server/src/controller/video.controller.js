const service = require('../service/video.service')

class VideoController {
  async videoData(ctx,next) {
    console.log(ctx.req);
    ctx.body = '上传成功'
  }
}
module.exports = new VideoController()