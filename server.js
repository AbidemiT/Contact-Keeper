const express = require("express");
const port = process.env.PORT || 3500;

const app = express();


app.get("/", (req, res) => {
    res.json({name: "Tiamiyu Sikiru Abidemi",
age: 24,
msg: "Welcome to Greatness"});
})

// Define routes
app.use("/api/users", require('./routes/users'));
app.use("/api/contacts", require('./routes/contacts'));
app.use("/api/auth", require('./routes/auth'));




app.listen(port, () => {
    console.log(`Server Active on port ${port}`);
});