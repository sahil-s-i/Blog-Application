const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const userRoutes = require("./routes/authRoutes");

// port 
const PORT = process.env.port || 3000;

// middleware 
app.use(express.urlencoded({ extended: true }));

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
