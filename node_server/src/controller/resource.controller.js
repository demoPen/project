const service = require('../service/resource.service')
const fs = require('fs')
class ResourceConteoller{
  async saveInfo(ctx,next) {
    const { name,url,desc,originName} = ctx.request.body;
    const res = await service.saveFile(url,desc,name,originName)
    if (res)   ctx.body = '上传资源成功'
    
  }

  async getFile(ctx,next) {
   const result =  await service.getFileList()
   ctx.body = result
  };

  async deleteFile(ctx,next){
    const {id, filename} = ctx.request.body
    await service.remove(id)
    fs.unlinkSync(`./video/${filename}`)
    ctx.body = '删除成功'
  }
}

module.exports = new ResourceConteoller()