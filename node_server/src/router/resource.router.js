const Router = require("koa-router");
const {
  createTable
} = require('../middleware/resource.middleware')

const {
  saveInfo,
  getFile,
  deleteFile
} = require('../controller/resource.controller')
const {
  verityToken
} = require('../middleware/auth.middleware')
const resourceRouter = new Router({
  prefix: '/resource'
})

resourceRouter.post('/info',verityToken, createTable,saveInfo )
resourceRouter.get('/info',getFile)
resourceRouter.delete('/info',verityToken,deleteFile)

module.exports = resourceRouter