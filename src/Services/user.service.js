const cripto = require("crypto");
const mysqlServise = require("./mysql.service");

class userService {
  // POST /signup (Public) - Create new user
  async signup(data) {
    return new Promise(async (resolve, reject) => {
      try {
        data.id = cripto.randomBytes(4).toString("hex");
        const sql = `INSERT INTO user SET ?`;
        try {
          await mysqlServise.query(sql, data);
          resolve(null);
        } catch (err) {
          return resolve(err);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // POST /signin (Public) - Login user
  async signin({ username, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "SELECT * FROM user WHERE password = ? AND username = ?";
        const result = await mysqlServise.query(sql, [password, username]);
        const msg = "Username or password is incorrect";
        if (!result) return resolve(msg);
        resolve(result[0]);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new userService();
