const User = require("../models/User");

// login 
exports.getlogin = (req, res) => {
    res.render("login");
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usermail = await User.findOne({ email });
        const isMatch = await User.findOne({ password });
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

}