const mongoose = require("mongoose");
const mongodbURL = "mongodb+srv://ahmadexpa:Ahmad%40786@devcluster.nbrfafb.mongodb.net/";
const connectDB = async () => {
    return await mongoose.connect(mongodbURL);
    console.log("mongodb connected");
}
module.exports = {connectDB};