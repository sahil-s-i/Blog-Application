require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/authRoutes");
const passport = require("passport");
const passportConfig = require("./config/passport");

// port 
const PORT = process.env.port || 3000;

// middleware 
app.use(express.urlencoded({ extended: true }));

// passport configuration 
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// ejs 
app.set('view engine', 'ejs');

//  routes
app.use("/auth", userRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected");
    // start server 
    app.listen(PORT, () => {
        console.log(`server is running on port http://localhost:${PORT}`);
    })
}).catch(() => {
    console.log("Database connection failed");
})
