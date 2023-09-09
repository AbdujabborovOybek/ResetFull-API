const db = require("../mysql.config");

class mysqlServise {
  // database query function for all services
  async query(query, values = null) {
    return new Promise((resolve, reject) => {
      try {
        db.query(query, values, (err, result) => {
          if (err) return reject(err.sqlMessage);
          if (!result.length) return resolve(null);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new mysqlServise();
