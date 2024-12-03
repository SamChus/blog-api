const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./middlewares/logger");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
require("dotenv").config();


const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });


app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api", userRoutes);
app.use("/api", postRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
