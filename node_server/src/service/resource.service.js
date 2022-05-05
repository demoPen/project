const connection = require("../app/database");

class ResourceService{
  async createTable() {
    const statement=`
    CREATE TABLE IF NOT EXISTS resource(
      id INT AUTO_INCREMENT PRIMARY KEY,
      describeText VARCHAR(100),
      url VARCHAR(200),
      filename VARCHAR(200),
      name VARCHAR(200)
    )    
    `
    try {
      await connection.execute(statement)
    } catch (error) {
      console.log(error);
    }
    
  };

  async saveFile(url,desc,name,origin){
    const statement = `
    INSERT INTO resource(url,describeText,filename,name) VALUES(?,?,?,?)
    `
    try {
     const [res] =  await connection.execute(statement,[url,desc,name,origin])
     return res
    } catch (error) {
      console.log(error);
    }
  };

  async getFileList() {
    const statement = `
       select * from resource
    `
    try {
      const [res] = await connection.execute(statement)
      return res
    } catch (error) {
      console.log(error);
    }
  };

  async remove(id){
    const statement = `delete from resource where id = ?`
    try {
      await connection.execute(statement,[id])
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ResourceService()