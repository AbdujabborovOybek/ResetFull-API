const cripto = require("crypto");
const mysqlServise = require("./mysql.service");
const { v5: uuidv5 } = require("uuid");
const jwtService = require("./jwt.service");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

class userService {
  // POST /signup (Public) - Create new user
  async signup(data) {
    return new Promise(async (resolve, reject) => {
      try {
        data.password = uuidv5(data.password, uuidv5.URL);
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
        const hashPassword = uuidv5(password, uuidv5.URL);
        const sql = "SELECT * FROM user WHERE password = ? AND username = ?";
        const result = await mysqlServise.query(sql, [hashPassword, username]);

        const msg = "Username or password is incorrect";
        if (!result) return reject(msg);
        const user = JSON.parse(JSON.stringify(result[0]));
        const token = await jwtService.createToken(user);

        resolve({ user, token });
      } catch (err) {
        reject(err);
      }
    });
  }

  // POST /update-user-img/:id (Private) - Update user image
  async updateImg(req, id, file) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.deleteOldImg(id);

        const uniqu = cripto.randomBytes(4).toString("hex");
        const format = file.originalname.split(".").pop();
        const imgName = `user_${uniqu}.${format}`;
        const to = path.join(__dirname, `../UserImages/${imgName}`);
        const img = `http://${req.headers.host}/img/${imgName}`;
        await sharp(file.buffer).resize(300, 300).toFile(to);

        const sql = "UPDATE user SET img = ? WHERE id = ?";
        await mysqlServise.query(sql, [img, id]);

        resolve(img);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Delete old image
  async deleteOldImg(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "SELECT img FROM user WHERE id = ?";
        const result = await mysqlServise.query(sql, userId);
        const file = result[0]?.img?.split("/")?.pop() || null;
        if (!file) return resolve(null);

        const pathFile = path.join(__dirname, `../UserImages/${file}`);
        fs.unlinkSync(pathFile);
        resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  // PATCH /update/user/:id (Private) - Update user
  async updateUser(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        data.updated_at = new Date();

        const sql = "UPDATE user SET ? WHERE id = ?";
        try {
          const result = await mysqlServise.mutation(sql, [data, id]);
          if (!result) return resolve("User doesn't exist");
          resolve(null);
        } catch (err) {
          resolve(err);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // GET /get/user (Private) - Get all users
  async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "SELECT * FROM user ORDER BY joined_at DESC";
        const result = await mysqlServise.query(sql);
        if (!result) return resolve(null);

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  // GET /get/user/:id (Private) - Get one user
  async getOne(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "SELECT * FROM user WHERE id = ?";
        const result = await mysqlServise.query(sql, id);
        if (!result) return resolve(null);
        resolve(result[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  // DELETE /delete/user/:id (Private) - Delete user
  async deleteUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "DELETE FROM user WHERE id = ? ";
        try {
          const result = await mysqlServise.mutation(sql, id);
          if (!result) return resolve("User doesn't exist");
          resolve(null);
        } catch (err) {
          resolve(err);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new userService();
