const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization.split(" ")[1];
    if (!jwt) {
      throw new Error("JWT Not Found");
    }
    const user = await userService.getUserByToken(jwt);
    if (!user) {
      throw new Error("User Not Found");
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUsers };
