const connection = require("../app/database");

class AdminService {
  async buildtable() {
    const statement = `CREATE TABLE IF NOT EXISTS admin(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;

    await connection.execute(statement);
  };

  async createadminInfo(name, password) {
    //创建管理员的信息
    const state = `SELECT * FROM admin WHERE name =?`;
    const [isEXISTS] = await connection.execute(state, [name]);
    // if(isEXISTS[0]) console.log(1)
    if (!isEXISTS[0]) {
      const statement = `INSERT INTO admin (name,password) VALUES(?,?) `;
      await connection.execute(statement, [name, password]);
    }
  };

  async getUserInfoByname(name){
    
    const statement = `SELECT * FROM admin WHERE name = ?`;
    const [userInfo] = await connection.execute(statement,[name]);
    
    return userInfo[0]
  }
}

module.exports = new AdminService();
