const jwtProvider = require("../config/jwt.provider");
const userService = require("../services/user.service");
const authenticate = async (req, res, next) => {
  try {
    // bearer <token>
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }
    const userID = await jwtProvider.verifyToken(token);
    const user = userService.getUserById(userID);
    if (!user) {
      throw new Error("Unauthorized");
    }
    req.user = user;
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
  next(); 
};
module.exports = { authenticate };
