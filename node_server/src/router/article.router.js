const Router = require('koa-router')


const {
  verityToken
} = require('../middleware/auth.middleware')

const {
  createArticle,
  verifyIsName,
  createCode
} = require('../middleware/article.middleware')
const {
  saveArticleInfo,
  getInfo,
  updateInfo,
  deleteInfo,
  getCodeHtml,
  saveCode,
  updateCode
} = require('../controller/article.controller')


const articleRouter = new Router({
  prefix: '/article'
})


articleRouter.post('/create', verityToken, createArticle, verifyIsName, saveArticleInfo)
articleRouter.get('/',getInfo)
articleRouter.patch('/:id',verityToken,updateInfo)
articleRouter.delete('/:id',verityToken,deleteInfo)
// articleRouter.post('/code',saveCode);
articleRouter.get('/code',createCode,getCodeHtml)
articleRouter.post('/code',saveCode);
articleRouter.patch('/code/article',updateCode);

module.exports = articleRouter