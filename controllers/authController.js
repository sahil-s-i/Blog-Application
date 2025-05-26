const User = require("../models/User");
const bcrypt = require("bcryptjs")
const passport = require("passport");
// login 
exports.getlogin = (req, res) => {
    res.render("login",{
        title: "login",
        user: req.user,
        error: ""
    });
}

exports.login = async (req, res, next) => {
    passport.authenticate(
        "local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.render("login", {
                    title: "login",
                    user: req.user,
                    error: info.message
                })
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect("/");
            })
        }
    )(req, res, next)
}

// register 
exports.getregister = (req, res) => {
    res.render("register",{
        title: "register",
        user: req.user,
        error: ""
    });
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
                user: req.user,
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
            user: req.user,
            error: error.message
        })
    }

}

// logout 
exports.logout = (req, res) => {
    req.logout((err)=>{
        if (err) {
            return next(err);
        }
        res.redirect("/auth/login");
    });
}