const articleService = require('../service/article.service')
const errorTypes = require("../constants/error-type")
const Multer = require("koa-multer");
const createArticle = async (ctx,next) =>{
  await articleService.createTable()
  await next()
}//创建表

const verifyIsName = async (ctx,next) =>{
  const {name} = ctx.request.body
  console.log(name);
  const res = await articleService.isSaveName(name)
  if(res.length!==0){
    const error = new Error(errorTypes.ARTICLE_NAME_DOES_NOT_SAME)
    return ctx.app.emit('error',error,ctx)
  }else{
    await next()
  }
}//对文章的主题名是否重复进行判断

const upload = Multer({
  dest:'./uploads/video'
})
const uploads = upload.single('file')

module.exports = {
  createArticle,
  verifyIsName,
  uploads
}