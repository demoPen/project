const Router = require('koa-router')

const {
  verityToken
} = require('../middleware/auth.middleware')

const {createArticle,verifyIsName} = require('../middleware/article.middleware')
const {saveArticleInfo} = require('../controller/article.controller')

const articleRouter = new Router({
  prefix:'/article'
})


articleRouter.post('/create',verityToken,createArticle,verifyIsName,saveArticleInfo)


module.exports = articleRouter