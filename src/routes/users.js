const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');
const router = express.Router();
const User = require("../models/User");
const {
    check,
    validationResult
} = require('express-validator');

// @route POST api/users
// @desc Register a user
// @access Public

router.post("/", [check('name', "Name field can't be empty").not().isEmpty(), check('email', "Enter a valid email").isEmail(), check('password', "Password length should be greater than 6").isLength({
    min: 6
})], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        name,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                msg: "User already exist"
            });
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();


        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 36000
        }, ((err, token) => {
            if (err) {
                throw err;
            }

            res.status(201).json({
                status: "Success",
                user,
                token
            })
        }))


    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }

})

module.exports = router;