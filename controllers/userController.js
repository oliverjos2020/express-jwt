const User = require("../models/user");


const getUsers = async (req, res) => {
  try {
    // const users = await User.find();
    const users = await User.find().select("name email phone createdAt");
    res.json(users);
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

module.exports = {
  getUsers
};
