const app = require(".");
const { connectDB } = require("./config/mongodb");
const PORT = 3000;
app.listen(PORT,  () => {
  connectDB();
  console.log("server is running on port " + PORT);
});
