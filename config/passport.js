
const LocalStrategy = require("passport-local").Strategy;
const { serializeUser, deserializeUser } = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


module.exports = function (passport) {

    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            //find the user
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: "User not found with this email" });
            }
            // compare the password with the hashed password 
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password" });
            }
            // Authentication succesfull, return the user object  
            return done(null, user);
            
        } catch (error) {
            return done(error);
        }
    }))

    // serializeUser : Determines which data of the user object should be stored in session, Here we store the user Id
    passport.serializeUser(function (user, done){
        done(null, user.id);  
    })

    // deserializeUse : deserialize the user object from the session 
    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    })

}