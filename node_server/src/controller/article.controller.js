const service = require('../service/article.service')

class articleController {
  async saveArticleInfo(ctx, next) {
    const info = ctx.request.body;
    const { name,orderBy } = info;
    await service.saveInfo(name,orderBy)
    ctx.body = '新建文章成功'
  }
}

module.exports = new articleController()