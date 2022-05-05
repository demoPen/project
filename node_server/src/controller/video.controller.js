const service = require('../service/video.service')
const fs = require('fs')
class VideoController {
  async videoData(ctx, next) {
    const {
      filename,
      mimetype,
      originalname
    } = ctx.req.file

    await service.saveVideo(mimetype, filename)
    ctx.body = {
      url: `http://localhost:9000/video/base/${filename}`,
      filename: filename,
      originalname
    }
  };

  async getVideo(ctx, next) {
    const {
      name
    } = ctx.params;
    const {
      fileName,
      mimetype
    } = await service.getType(name)
    ctx.response.set('content-type', mimetype);
    ctx.body = fs.createReadStream(`./video/${fileName}`);
  };

  async saveVideoInfo(ctx, next) {
    const {
      desc,
      url,
      filename
    } = ctx.request.body
    await service.locationInfo(desc, url, filename)
    ctx.body = '保存视频成功'
  };

  async getYY(ctx,next) {
  const res= await service.getLocationVideo('video_location')
   ctx.body = res
  };

  async deleteById(ctx,next){
    const { id ,file} = ctx.request.body
    await service.deleteVideo(id)
    fs.unlinkSync(`./video/${file}`)
    ctx.body = '删除成功'

  }

  async saveiframe(ctx,next){
   const {iframe,desc} = ctx.request.body
   await service.saveIframeByCode(iframe,desc)
   ctx.body = `上传网页视频成功`
  }

  async getIframe(ctx,next){
    const res= await service.getLocationVideo('iframe')
    ctx.body = res
  }

  async deleteIframe(ctx,next){
    const {id} = ctx.request.body
    // console.log(id);
    await service.deleteCode(id)
    ctx.body='删除网页视频成功'
  }

}
module.exports = new VideoController()