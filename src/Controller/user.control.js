const userService = require("../Services/user.service");
const response = require("../Services/response.service");

class userControl {
  // POST /signup (Public) - Create new user
  async signup(req, res) {
    try {
      const result = await userService.signup(req.body);
      if (result) return await response.warning(res, result);
      await response.created(res, "Welcome to the club");
    } catch (err) {
      await response.internal(res, err);
    }
  }

  // POST /signin (Public) - Login user
  async signin(req, res) {
    try {
      const result = await userService.signin(req.body);
      if (!result) return await response.notFound(res, result);
      const msg = `Welcome ${result.fullname}`;
      await response.success(res, msg, result);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  // POST /update-user-img/:id (Private) - Update user image
  async updateImg(req, res) {
    try {
      const result = await userService.updateImg(req, req.params.id, req.file);
      await response.success(res, "Image updated successfully", result);
    } catch (err) {
      await response.internal(res, err);
    }
  }
}

module.exports = new userControl();
