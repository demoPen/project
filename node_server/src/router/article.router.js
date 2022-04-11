const Router = require('koa-router')
const fs = require('fs')

const {
  verityToken
} = require('../middleware/auth.middleware')

const {
  createArticle,
  verifyIsName,
  uploads
} = require('../middleware/article.middleware')
const {
  saveArticleInfo
} = require('../controller/article.controller')
const { log } = require('console')

const articleRouter = new Router({
  prefix: '/article'
})


articleRouter.post('/create', verityToken, createArticle, verifyIsName, saveArticleInfo)
articleRouter.post('/upload',uploads,(ctx,next)=>{
  // const info = ctx.req.files
  // const {filename} = ctx.request.req.file
  // fs.readFile(`./uploads/video/${filename}`,(err,data)=>{
  //   console.log(data);
  // })
  // console.log(info);
  ctx.body = 'iiii'
})


module.exports = articleRouter