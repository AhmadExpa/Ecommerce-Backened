const jwt = require("jsonwebtoken");    
const JWT_SECRET = "s3cr3t";
const tokenProvider = (userID) => {
    const token = jwt.sign({ userID }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
};
const verifyToken = (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userID;
};
module.exports = { tokenProvider, verifyToken }