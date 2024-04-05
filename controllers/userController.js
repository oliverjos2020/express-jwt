const User = require("../models/user");
const { validationResult } = require("express-validator");


const getUsers = async (req, res) => {
  try {
    // const users = await User.find();
    const users = await User.find().select("name email phone createdAt");
    res.json(users);
  } catch (error) {
    res.status(500).json({ responseMessage: error.message });
  }
};

const editUsers = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res
       .status(400)
       .json({ responseCode: 400, responseMessage: errors.array() });
   }
  const { id } = req.body;
  const userdb = await User.findOne({ _id: id });
  if (userdb) {
    return res.status(200).json({
      responseMessage: "Record Found",
      responseCode: 200,
      data: {name: userdb.name, email: userdb.email, phone: userdb.phone, id:id}
    });
  } else {
    return res.status(401).send({
      responseMessage: "Record not found",
      responseCode: 401,
    });
  }
  console.log(userdb);

}

const updateUsers = async (req, res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ responseCode: 400, responseMessage: errors.array() });
  }

  
  
  try {
    const { name, phone, email, id } = req.body;

    const userData = { name, phone, email };
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ responseCode: 404, responseMessage: "User not found" });
    }
     return res
       .status(200)
       .json({
         responseCode: 200,
         responseMessage: "User updated successfully",
         user: updatedUser,
       });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating user:", error);
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ responseCode: 400, responseMessage: "Duplicate email address" });
    }
    
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ responseCode: 400, responseMessage: "Invalid user ID" });
    }

    // Handle database connection errors
    console.error("Database connection error:", error);
    return res.status(500).json({ responseCode: 500, responseMessage: "Database connection error" });
  
  }
  

}

module.exports = {
  getUsers,
  editUsers,
  updateUsers
};
