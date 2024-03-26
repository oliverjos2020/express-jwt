const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/sm3_jwt", { })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
