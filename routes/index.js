var express = require('express');
var router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Express" });
});

router.get("/dashboard", requireAuth, (req, res)=>res.render("dashboard"));

module.exports = router;
