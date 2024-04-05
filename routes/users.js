var express = require('express');
var router = express.Router();
const { getUsers, editUsers, updateUsers } = require("../controllers/userController");
const { body } = require("express-validator");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/getusers", requireAuth, getUsers);
// router.get("/editusers", editUsers);
router.post(
  "/editusers",
  requireAuth, [body("id").notEmpty().withMessage("Id is required")],
  editUsers
);

router.post(
  "/update",
  [
    body("name").notEmpty().withMessage("Name field is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("phone").isMobilePhone().withMessage("Invalid phone number")
  ],
  updateUsers
);

module.exports = router;
