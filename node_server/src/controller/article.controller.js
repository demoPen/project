const service = require("../service/article.service");

class articleController {
  async saveArticleInfo(ctx, next) {
    const info = ctx.request.body;
    const { name, orderBy } = info;
    await service.saveInfo(name, orderBy);
    ctx.body = "新建文章成功";
  }

  async getInfo(ctx, next) {
    const result = await service.getArticle();
    ctx.body = result;
  }

  async updateInfo(ctx, next) {
    const info = ctx.request.body;
    const {id} = ctx.params
    const { name, orderBy } = info;
    await service.updateArticle(name,orderBy,id)
    ctx.body = `修改成功`
  };

  async deleteInfo(ctx,next) {
    const {id} = ctx.params
     await service.deleteArticle(id)
    ctx.body = '删除成功'
  };

  async getCodeHtml(ctx,next){
    const {articleId} = ctx.query;
   const result =  await service.getHtml(articleId)
   ctx.body = result
  };

  async saveCode(ctx,next){
    const {articleId,render,value}= ctx.request.body;
    await service.saveHtml(articleId,render,value);
    ctx.body = '保存成功'
  };

  async updateCode(ctx,next){
    const {articleId,render,value}= ctx.request.body;
    // console.log(articleId);
    await service.updateHtml(articleId,render,value);
    ctx.body = `修改成功`
  }
}

module.exports = new articleController();
