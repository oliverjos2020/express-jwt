const express = require('express');
const router = express.Router();
const { body,  validationResult } = require('express-validator');
const { hashPassword, comparePassword } = require("../utils/helper");
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', [
    body('name').notEmpty().withMessage('Name field is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').isMobilePhone().withMessage('Invalid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    // body('confirmpassword').isLength({ min: 8 }).withMessage('Confirm password must be at least 8 characters'),
    body('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm password does not match password');
        }
        return true;
    })
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], loginUser);

module.exports = router;


