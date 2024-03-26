const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/sm3", {}).then(() => console.log("Connected to MongoDB successfully")).catch((err) => console.log(err));
