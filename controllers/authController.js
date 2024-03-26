const { validationResult } = require('express-validator');
const { hashPassword, comparePassword } = require("../utils/helper");
const User = require('../models/user');

const registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ responseCode: 400, errors: errors.array() });
    }

    try {
        const { name, phone, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const userdb = await User.findOne({ email });
        if (userdb) {
            return res
                .status(400)
                .send({
                    errors: [
                        { 'path': 'userexist', 'msg': `User with ${email} already exists` }
                    ], responseCode: 400
                });
        }
        // Create a new user and save it to the database
        const newUser = await User.create({
            name,
            phone,
            email,
            password: hashedPassword
        });

        // Send a success response
        return res.status(201).json({ response: "User created successfully", responseCode: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: "Failed to register user", responseCode: 500 });
    }
};

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ responseCode: 400, responseMessage: errors.array() });
    }

    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const userdb = await User.findOne({ email });

    if (!userdb) {
        return res
            .status(400)
            .send({
                errors: [
                    { 'path': 'userexist', 'msg': `User with ${email} already exists` }
                ], responseCode: 400
            });
    }
    const isValid = comparePassword(password, userdb.password);
    if (isValid) {
        req.session.user = userdb;
        return res.status(200).send({ responseMessage: "Login Successful", responseCode: 200 });
    //   res.sendStatus(200);
    } else {
        // res.sendStatus(401);
        return res
          .status(401)
          .send({
            responseMessage: "Invalid login credentials kindly check and try again",
            responseCode: 401,
          });
    }
}

module.exports = {
    registerUser,
    loginUser
};
