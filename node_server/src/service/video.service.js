const connection = require("../app/database");

class VideoService {
  async createTable() {
    const statement = `
    CREATE TABLE IF NOT EXISTS video(
      id INT AUTO_INCREMENT PRIMARY KEY,
      mimetype varchar(200),
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
      console.log(error);
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
      video VARCHAR(200),
      file VARCHAR(200)
    )
    `
   try {
     await connection.execute(statement)
   } catch (error) {
     console.log(error);
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

  async getLocationVideo(type) {
    const statement =`select * from ${type}`
    try {
      const [res] = await connection.execute(statement)
        return res
    } catch (error) {
      console.log(error);
    }
  }

  async deleteVideo(id){
    const statement = `delete from video_location where id =? `
    try {
      await connection.execute(statement,[id])
    } catch (error) {
      console.log(error);
    }
  };

  async createiframeTable(){
    const statement = `CREATE TABLE IF NOT EXISTS iframe(
      id INT AUTO_INCREMENT PRIMARY KEY,
      describeText VARCHAR(100),
      iframe VARCHAR(200)
    )
    `
  try {
    await connection.execute(statement)
  } catch (error) {
    console.log(error);
  }
  }

  async saveIframeByCode(iframe,desc){
   const statement = `insert into iframe(describeText,iframe) values(?,?)`
   try {
     await connection.execute(statement,[desc,iframe])
   } catch (error) {
     
   }
  }

  async deleteCode(id){
    const statement = `delete from iframe where id =? `
    try {
      await connection.execute(statement,[id])
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new VideoService();