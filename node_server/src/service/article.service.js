const connection = require('../app/database')


class articleService {
  async createTable() {
    const statement = `CREATE TABLE IF NOT EXISTS article(
        id INT AUTO_INCREMENT PRIMARY KEY,
        theme VARCHAR(100) NOT NULL UNIQUE KEY,
        sort INT not NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
       )`
    try {
      await connection.execute(statement)
    } catch (error) {
      console.log(error);
    }
  };//创建文章的表

  async saveInfo(name,sort){
    const statement =`INSERT INTO article (theme,sort) VALUES (?,?)`
    try {
     const [res] = await connection.execute(statement,[name,sort])
     return res
    } catch (error) {
      console.log(error);
    }
  };//保存文章信息
  async isSaveName(name) {
    const statement = `select * from article where theme =?`
    try {
      const [res] = await connection.execute(statement,[name])
      return res
    } catch (error) {
    }
  };

}

module.exports = new articleService()