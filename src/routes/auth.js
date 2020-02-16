const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');
const User = require("../models/User");
const auth = require("../middleware/auth");
const {
    check,
    validationResult
} = require('express-validator');

// @route GET api/auth
// @desc Get logged in user
// @access Private

router.get("/", auth, async(req,res) => {
    const user = await User.findById(req.user.id).select("-password");
    try {
        res.status(200).json({user});
    } catch (err) {
        res.status(500).json({msg: "Server Error"});
    }
})

// @route POST api/auth
// @desc Auth user and get token
// @access Public

router.post("/", [check("email", "Enter a valid email").isEmail(), check("password", "Enter password").exists()], async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

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

            res.status(200).json({
                status: "Success",
                user,
                token
            })
        }))


    } catch (err) {
        res.status(500).json({msg: "Server Error"});
    }
})

module.exports = router;