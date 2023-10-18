const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const userRoutes = require("./modules/user/user.routes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/v1/users", userRoutes);

// testing api
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
