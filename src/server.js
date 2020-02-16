const express = require("express");
const port = process.env.PORT || 3500;
const connectDB = require("../config/db");
const path = require('path');
const app = express();
connectDB();

app.use(express.json({extended: false}));

// Define routes
app.use("/api/users", require('./routes/users'));
app.use("/api/contacts", require('./routes/contacts'));
app.use("/api/auth", require('./routes/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req,res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}


app.listen(port, () => {
    console.log(`Server Active on port ${port}`);
});