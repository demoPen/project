const app = require('./app/main')
const config = require('./app/config');
require('./app/database');
// require('./service/admin')

app.listen(config.APP_PORT,()=>{
  console.log(`服务器在${config.APP_PORT}启动成功`);
})