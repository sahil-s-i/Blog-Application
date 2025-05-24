const User = require("../models/User");
const bcrypt = require("bcryptjs")
// login 
exports.getlogin = (req, res) => {
    res.render("login");
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usermail = await User.findOne({ email });
        // const isMatch = await User.findOne({ password });
        const isMatch = await bcrypt.compare(password, usermail.password);
        if (usermail && isMatch) {
            res.send("Login successful");
        } else {
            res.send("login failed");
        }
    } catch (error) {
        res.send(error);
    }
}

// register 
exports.getregister = (req, res) => {
    res.render("register");
}

exports.register = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    try {
        // if user exists 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("register", {
                title: "register",
                user: req.username,
                error: "User already exists with this email"
            })
        }
        // hash the user password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user 
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        // save the user 
        await user.save();
        res.redirect("/auth/login");
    } catch (error) {
        res.render("register", {
            title: "register",
            user: req.username,
            error: error.message
        })
    }

}