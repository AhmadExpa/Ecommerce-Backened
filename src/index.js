const cors = require("cors"); // when api integrate with frontend then the backend url is different from fronend and the user cannot access the backened
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const authRoute = require("./routes/auth.routes");
app.use("/auth", authRoute);

const userRoute = require("./routes/user.routes");
app.use("/api/users", userRoute);

const productRoute = require("./routes/product.routes");
app.use("/api/products", productRoute);

const adminProductRoute = require("./routes/adminProduct.routes");
app.use("/api/adminProducts", adminProductRoute);

// const cartRoute = require("./routes/cart.routes");
// app.use("/api/carts", cartRoute);

// const cartItemRoute = require("./routes/cartItem.routes");
// app.use("/api/cartItems", cartItemRoute);

// const orderRoute = require("./routes/order.routes");
// app.use("/api/orders", orderRoute);

// const reviewRoute = require("./routes/review.routes");
// app.use("/api/reviews", reviewRoute);


// const ratingRoute = require("./routes/rating.routes");
// app.use("/api/ratings", ratingRoute);

// const adminOrderRoute = require("./routes/adminOrderControl.routes");
// app.use("/api/adminOrders", adminOrderRoute);



module.exports = app;
