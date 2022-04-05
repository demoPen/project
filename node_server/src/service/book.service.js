const connection = require("../app/database");
class BookService {
  async createBookTable() {
    const statement = `
    CREATE TABLE IF NOT EXISTS book(
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(50) NOT NULL,
      weight INT,
      user_id INT NOT NULL,
      img VARCHAR(100) NOT NULL,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES admin(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    `;
    try {
      await connection.execute(statement);
    } catch (err) {
      console.log(err);
    }
  };

  async bookBasicInfo(title, weight, user_id, img) {
    const statement = `
   INSERT INTO book (title,weight,user_id,img) VALUES(?,?,?,?)
   `;
    try {
      await connection.execute(statement, [title, weight, user_id, img]);
    } catch (err) {
      console.log(err);
    }
  };
  async getBook() {
    const statement = `
    SELECT JSON_OBJECT('id',b.id,
             'title',b.title,
						 'order',b.weight,
						 'userId',b.user_id,
						 'img',CONCAT('http://localhost:9000/file', b.img),
						 'createTime',b.createAt,
						 'updateTime',b.updateAt) bookInfo FROM book b;
    `;
    try {
      const [result] = await connection.execute(statement);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  async deleteBookById(id) {
    const statement = `DELETE FROM book WHERE id = ?`;
    try {
      await connection.execute(statement, [id]);
    } catch (err) {
      console.log(err);
    }
  };

  async updateBookInfo(name, weight, img, id) {
    const statement = `
    UPDATE book SET title=?,weight=?,img=? WHERE id = ?
    `;
    try {
      await connection.execute(statement, [name, weight, img, id]);
    } catch (err) {
      console.log(err);
    }
  };

  async createChapter() {
    const statement = `
    CREATE TABLE IF NOT EXISTS chapter(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      sort INT,
      book_id INT NOT NULL,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE ON UPDATE CASCADE,
      UNIQUE KEY(name,book_id)
      );`;
    try {
      await connection.execute(statement);
    } catch (err) {
      console.log(err);
    }
  };
  async isSameName(name,id){
   const statement =`SELECT * FROM chapter WHERE name = ? AND book_id = ?`
   try{
    const [res] = await connection.execute(statement,[name,id])
    return res
   }catch(err){
     console.log(err);
   }
  }

  async saveChapterInfo(name,sort,book_id){
   const statement = `INSERT INTO chapter (name,sort,book_id) values(?,?,?)`;
   try{
  const res = await connection.execute(statement,[name,sort,book_id]);
  return res
   }catch(err){
     console.log(err);
   }
  };

  async getChapterById(id){//根据书籍的id来获取对应的所有章节
    const statement = `SELECT * FROM chapter WHERE book_id = ? ORDER BY sort ASC`;
    try{
     const [res] = await connection.execute(statement,[id]);
     return res
    }catch(err){
      console.log(err);
    }
  };

  async updateChapterInfo(name,id){
    const statement = `UPDATE chapter set name = ? WHERE id = ?`;
    try{
    await connection.execute(statement,[name,id])
    }catch(err){
      console.log(err);
    }
  };

  async deleteChapterById(id) {
    const statement = `DELETE FROM chapter WHERE id = ?`;
    try {
      await connection.execute(statement, [id]);
    } catch (err) {
      console.log(err);
    }
  };

  async createInnerImg(){
    const statement = `CREATE TABLE IF NOT EXISTS innerImg(
      id INT PRIMARY KEY AUTO_INCREMENT,
      imgdest VARCHAR(100),
      mimetype VARCHAR(20),
      
   )`;
   try{
    await connection.execute(statement)
   }catch(err){
    console.log(err);
   }
  };

  async insertImginfo(imgdest,mimetype){
    const statement = ` INSERT INTO innerImg (imgdest,mimetype) VALUES (?,?)`;
    try{
     await connection.execute(statement,[imgdest,mimetype])
    }catch(err){
    console.log(err);
    }
  };

  async createCode(){
    const statement = `CREATE TABLE IF NOT EXISTS md_code(
      id INT AUTO_INCREMENT PRIMARY KEY,
      md_text LONGTEXT,
      chapter_id INT unique,
      val LONGTEXT,
      FOREIGN KEY (chapter_id) REFERENCES chapter(id) ON DELETE CASCADE ON UPDATE CASCADE
   )`
   try{
    await connection.execute(statement)
   }catch(err){
     console.log(err);
   }
  };

  async saveHtml(chapter_id,code,value){
    const statement =`INSERT INTO md_code (chapter_id,md_text,val) VALUES(?,?,?)`
    try{
     await connection.execute(statement,[chapter_id,code,value])
    }catch(err){
      if(err)
      console.log(err);
    }
  };

  async getHtml(chapter_id){
    const statement = `SELECT * FROM md_code WHERE chapter_id = ?`
    try{
     const [res] = await connection.execute(statement,[chapter_id])
      return res;
     }catch(err){
       console.log(err);
     }
  }

  async updateHtml(chapterId,md_text,val){
    const statement =`UPDATE md_code set md_text = ?, val =? WHERE chapter_id = ?`
    try{
     await connection.execute(statement,[md_text,val,chapterId])
    }catch(err){
      console.log(err);
    }
  }
}
module.exports = new BookService();
