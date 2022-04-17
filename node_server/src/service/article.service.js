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
  }; //创建文章的表

  async saveInfo(name, sort) {
    const statement = `INSERT INTO article (theme,sort) VALUES (?,?)`
    try {
      const [res] = await connection.execute(statement, [name, sort])
      return res
    } catch (error) {
      console.log(error);
    }
  }; //保存文章信息
  async isSaveName(name) {
    const statement = `select * from article where theme =?`
    try {
      const [res] = await connection.execute(statement, [name])
      return res
    } catch (error) {}
  };

  async getArticle() {
    const statement = `select * from article`
    try {
      const [res] = await connection.execute(statement)
      return res
    } catch (error) {
      console.log(error);
    }
  } //获取文章信息

  async updateArticle(name, orderBy, id) {
    const statement = `update article set theme= ?, sort= ?  where id =?`
    try {
      await connection.execute(statement, [name, orderBy, id])
    } catch (error) {
      console.log(error);
      return
    }
  };

  async deleteArticle(id) {
    const statement = `delete from article where id = ?`
    try {
      await connection.execute(statement, [id])
    } catch (error) {
      console.log(error);
      return
    }
  }

  async codeTable() {
    const statement = `CREATE TABLE IF NOT EXISTS md_code_article(
      id INT AUTO_INCREMENT PRIMARY KEY,
      md_text LONGTEXT,
      article_id INT unique,
      val LONGTEXT,
      FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE ON UPDATE CASCADE
   )`
    try {
      await connection.execute(statement)
    } catch (error) {

    }
  }

  async getHtml(article_id) {
    const statement = `SELECT * FROM md_code_article WHERE article_id = ?`
    try {
      const [res] = await connection.execute(statement, [article_id])
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  async saveHtml(article_id,code,value){
    const statement =`INSERT INTO md_code_article (article_id,md_text,val) VALUES(?,?,?)`
    try{
     await connection.execute(statement,[article_id,code,value])
    }catch(err){
      if(err)
      console.log(err);  
    } 
  };

  async updateHtml(articleId,md_text,val){
    const statement =`UPDATE md_code_article set md_text = ?, val =? WHERE article_id = ?`
    try{
     await connection.execute(statement,[md_text,val,articleId])
    }catch(err){
      console.log(err);
    }
  }
}

module.exports = new articleService()