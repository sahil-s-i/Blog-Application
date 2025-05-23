const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// port 
const PORT = process.env.port || 3000;

// ejs 
app.set('view engine', 'ejs');


// routes 
app.get("/auth/login", (req, res) => {
    res.render("login");
})
app.get("/auth/register", (req, res) => {
    res.render("register");
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected");
    // start server 
    app.listen(PORT, () => {
        console.log(`server is running on port http://localhost:${PORT}`);
    })
}).catch(() => {
    console.log("Database connection failed");
})
