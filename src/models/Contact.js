const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: "user"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: "personal"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const contactModel = mongoose.model('contact', contactSchema);

module.exports = contactModel;