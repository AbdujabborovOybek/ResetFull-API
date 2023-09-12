const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;

class jwtService {
  async createToken(data) {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(data, key, { expiresIn: "1h" });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }

  async verifyToken(token) {
    return new Promise((resolve, reject) => {
      try {
        const data = jwt.verify(token, key);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new jwtService();
