const express = require("express");
const userRoutes = express.Router();

const User = require("../models/User");
const { getlogin, login, getregister, register, logout } = require("../controllers/authController");

// login 
userRoutes.get("/login", getlogin)

//main login for user login
userRoutes.post("/login", login)

// register
userRoutes.get("/register", getregister)

// main logic for the register 
userRoutes.post("/register", register)

// logout 
userRoutes.get("/logout", logout);


module.exports = userRoutes;