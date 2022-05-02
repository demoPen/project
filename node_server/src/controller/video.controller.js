const service = require('../service/video.service')
const fs = require('fs')
class VideoController {
  async videoData(ctx, next) {
    const {
      filename,
      mimetype
    } = ctx.req.file
    await service.saveVideo(mimetype, filename)
    ctx.body = {
      url: `http://localhost:9000/video/${filename}`,
      filename: filename
    }
  };

  async getVideo(ctx, next) {
    const {
      name
    } = ctx.params;
    console.log(name);
    const {
      fileName,
      mimetype
    } = await service.getType(name)
    ctx.response.set('content-type', mimetype);
    ctx.body = fs.createReadStream(`./video/${fileName}`);
  };

  async saveVideoInfo(ctx,next){
    const {desc,url,filename} = ctx.request.body
    await service.locationInfo(desc,url,filename)
    ctx.body = '保存视频成功'
  }
}
module.exports = new VideoController()