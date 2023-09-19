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
      try {
        const result = await userService.signin(req.body);
        if (!result) return await response.notFound(res, result);
        const msg = `Welcome ${result.fullname}`;
        await response.success(res, msg, result);
      } catch (err) {
        await response.notFound(res, err);
      }
    } catch (err) {
      await response.internal(res, err);
    }
  }

  // POST /update-user-img/:id (Private) - Update user image
  async updateImg(req, res) {
    try {
      const confirm = req.user.id === req.params.id;
      const msg = "You can't update this user";
      if (!confirm) return await response.warning(res, msg);

      const result = await userService.updateImg(req, req.params.id, req.file);
      await response.success(res, "Image updated successfully", result);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  // PATCH /update/user/:id (Private) - Update user
  async updateUser(req, res) {
    try {
      const confirm = req.user.id === req.params.id;
      const msg = "You can't update this user";
      if (!confirm) return await response.warning(res, msg);

      const result = await userService.updateUser(req.params.id, req.body);
      if (result) return await response.warning(res, result);
      const user = await userService.getOne(req.params.id);
      await response.success(res, "User updated successfully", user);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  // GET /get/user (Private) - Get all users
  async getAll(req, res) {
    try {
      const result = await userService.getAll();
      const msg = "Users don't exist";
      if (!result) return await response.notFound(res, msg);
      await response.success(res, "Users retrieved successfully", result);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  // GET /get/user/:id (Private) - Get one user
  async getOne(req, res) {
    try {
      const result = await userService.getOne(req.params.id);
      const msg = "User doesn't exist";
      if (!result) return await response.notFound(res, msg);
      await response.success(res, "User retrieved successfully", result);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  // DELETE /delete/user/:id (Private) - Delete user
  async deleteUser(req, res) {
    try {
      const confirm = req.user.id === req.params.id;
      const msg = "You can't update this user";
      if (!confirm) return await response.warning(res, msg);

      const result = await userService.deleteUser(req.params.id);
      if (result) return await response.warning(res, result);
      await response.success(res, "User deleted successfully", result);
    } catch (err) {
      await response.internal(res, err);
    }
  }
}

module.exports = new userControl();
