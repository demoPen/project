const connection = require("../app/database");

class VideoService {
  async createTable() {
    const statement = `
    CREATE TABLE IF NOT EXISTS video(
      id INT AUTO_INCREMENT PRIMARY KEY,
      mimetype varchar(20),
      fileName VARCHAR(200)
     )
    `;
    try {
      await connection.execute(statement);
    } catch (error) {}
  };

  async saveVideo(mimetype, fileName) {
    const statement = `insert into video(mimetype,fileName) values (?,?)`
    try {
      await connection.execute(statement, [mimetype, fileName])
    } catch (error) {

    }
  };

  async getType(fileName) { //获取文件类型
    const statement = `select * from video where fileName = ?`
    try {
      const [res] = await connection.execute(statement, [fileName])
      return res[0]
    } catch (error) {

    }
  }

  async createInfoTable() {
    const statement = `
    CREATE TABLE IF NOT EXISTS video_location(
      id INT PRIMARY KEY AUTO_INCREMENT,
      describeText VARCHAR(200),
      video VARCHAR(20),
      file VARCHAR(200)
    )
    `
   try {
     await connection.execute(statement)
   } catch (error) {
     
   }
  };

 async locationInfo(desc,video,file) {
   const statement = `insert into video_location(describeText,video,file) values(?,?,?)`

   try {
     await connection.execute(statement,[desc,video,file])
   } catch (error) {
     console.log(error);
   }
 }
}

module.exports = new VideoService();