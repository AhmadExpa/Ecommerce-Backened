const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwt.provider");
const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User Already Exist With Email :", email);
    }
    password = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password });
    const result = await user.save();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
      // .populate("address");
    if (!user) {
      throw new Error("User Not Found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found With Email :", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByToken = async (token) => {
  try {
    const userId = await jwtProvider.verifyToken(token);
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User Not Found (JWT)");
    }          
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByToken,
  getAllUsers,
};
