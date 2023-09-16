const AJV = require("ajv");
const ajv = new AJV({ allErrors: true });
const response = require("../Services/response.service");

class userValidation {
  static async cheack(schema, data) {
    return new Promise((resolve, reject) => {
      try {
        const error = ajv.validate(schema, data);
        if (!error) return resolve(ajv.errorsText());
        resolve(null);
      } catch (err) {
        reject(err);
      }
    });
  }

  static async signup(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 2,
          maxLength: 35,
        },

        email: {
          type: "string",
          pattern: "^[a-z0-9+_]+@[a-z.]+$",
        },
        phone: {
          type: "number",
        },
        username: {
          type: "string",
          pattern: "^[a-z0-9]+$",
          minLength: 5,
          maxLength: 20,
        },
        password: {
          pattern: "^[a-z0-9]+$",
          type: "string",
          minLength: 5,
          maxLength: 20,
        },
      },
      additionalProperties: false,
      required: ["fullname", "phone", "username", "password"],
    };

    try {
      const result = await userValidation.cheack(schema, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  static async signin(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        username: {
          type: "string",
          pattern: "^[a-z0-9]+$",
          minLength: 5,
          maxLength: 20,
        },
        password: {
          pattern: "^[a-z0-9]+$",
          type: "string",
          minLength: 5,
          maxLength: 20,
        },
      },
      additionalProperties: false,
      required: ["username", "password"],
    };

    try {
      const result = await userValidation.cheack(schema, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  static async updateUser(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 2,
          maxLength: 35,
        },

        email: {
          type: "string",
          pattern: "^[a-z0-9+_]+@[a-z.]+$",
        },
        phone: {
          type: "number",
        },
        username: {
          type: "string",
          pattern: "^[a-z0-9]+$",
          minLength: 5,
          maxLength: 20,
        },
      },
      additionalProperties: false,
      required: ["fullname", "phone", "username"],
    };

    try {
      const result = await userValidation.cheack(schema, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      await response.internal(res, err);
    }
  }
}

module.exports = userValidation;
