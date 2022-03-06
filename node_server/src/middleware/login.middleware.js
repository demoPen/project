const adminservice = require('../service/admin')
const md5password = require('../utils/md5-handle')
const {ADMIN_USER,ADMIN_PASSWORD} = require('../app/config');

const createTable = async (ctx,next)=>{
  await adminservice.buildtable()
  await adminservice.createadminInfo(ADMIN_USER,md5password(ADMIN_PASSWORD));
  await next()
}

module.exports = {
  createTable
}