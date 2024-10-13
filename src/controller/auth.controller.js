const jwtProvider = require("../config/jwt.provider");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = jwtProvider.tokenProvider(user._id);
    res.status(201).json({ message: "Registration Success", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      throw new Error("User Not Found With Email :", req.body.email);
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Password");
    }
    const token = jwtProvider.tokenProvider(user._id);
    res.status(200).json({ message: "Login Success", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { register, login };
