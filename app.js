const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

// port 
const PORT = process.env.port || 3000;

// middleware 
app.use(express.urlencoded({ extended: true }));

// ejs 
app.set('view engine', 'ejs');


// routes 
app.get("/auth/login", (req, res) => {
    res.render("login");
})

app.get("/auth/register", (req, res) => {
    res.render("register");
})

// main logic for the register 
app.post("/auth/register", async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    try {
        // if user exists 
        const user = await User.findOne({ email });
        if (user) {
            return res.send("user already exists");
        } else {
            const newUser = new User({
                username,
                email,
                password
            });
            // save the user    
            await newUser.save();

            // redirect to the login page 
            res.redirect("/auth/login");
        }
    } catch (error) {
        res.send(error);
    }

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
