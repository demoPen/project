const connection = require('../app/database')

class VideoService {
  async createTable() {
    const statement = `
    CREATE TABLE IF NOT EXISTS location (
      id INT AUTO_INCREMENT PRIMARY KEY,
      path VARCHAR(200),
      describeText VARCHAR(100),
      fileName VARCHAR()
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
     )
    `
    try {
      await connection.execute(statement)
    } catch (error) {
      
    }
  }
}

module.exports = new VideoService()