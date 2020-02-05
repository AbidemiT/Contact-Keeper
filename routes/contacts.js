const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");
const {
    check,
    validationResult
} = require('express-validator');

// @route GET api/contacts
// @desc Get all user contacts
// @access Private

router.get("/", auth, async(req,res) => {
    const contacts = await Contact.find({user: req.user.id});

    try {
        res.status(200).json(contacts)
    } catch (err) {
        res.status(500).json({msg: "Server Error"});
    }
})


// @route POST api/contacts
// @desc Add new contact
// @access Private

router.post("/", auth,[check("name", "Name field is required")], async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {name,email,phone,type} = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        await newContact.save();

        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({msg: "Server Err"});
    }
})

// @route UPDATE api/contacts/:id
// @desc Update contact
// @access Private

router.put("/:id", auth, async(req,res) => {
    const {name,email,phone,type} = req.body;
    const id = req.params.id;
    
    // Build contact Object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(id);


        if (!contact) {
            return res.status(404).json({msg: "Contact not found"});
        }

        // Make sure user owns contact
        
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Not Authorized"})
        }

        // Save updated contact
        contact = await Contact.findByIdAndUpdate(id,{$set: contactFields}, {new: true});

        res.json(contact);


    } catch (err) {
        res.status(500).json({msg: "Server Error"})
    }
})

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private

router.delete("/:id",auth, async(req,res) => {
    const id = req.params.id;

    try {
        let contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({msg: "Contact not found"});
        }

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
           return res.status(401).json({msg: "Not Authorized"})
        }

        // Delete contact
        await Contact.findByIdAndRemove(id);

        res.status(200).json(contact);


    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
})

module.exports = router;