const service = require('../service/resource.service')


const createTable = async (ctx,next) =>{
  await service.createTable()
  await next()
}

module.exports = {
  createTable
}