const mongoose = require('mongoose');
const config = require("config");
const db = config.get("mongoURI")

const connectDB = () => {
    mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })
}

module.exports = connectDB;