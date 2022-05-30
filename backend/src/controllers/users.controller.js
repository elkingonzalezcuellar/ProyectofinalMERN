
const passport = require('passport')
const User = require('../models/user.model');

const userController = {};
 

userController.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
};
userController.singup= async (req, res) => {
    try {
        let errors = [];
        const { name, email, password, confirm_password } = req.body; 
        if (password != confirm_password) {
          errors.push({ text: "Passwords do not match." });
        }
        if (password.length < 4) {
          errors.push({ text: "Passwords must be at least 4 characters." });
        }
        if (errors.length > 0) { 
               res.redirect("/users/signup", {
               errors,
               name,
               email,
              password,
      confirm_password,
    });
        }else {
          // Look for email coincidence
          const emailUser = await User.findOne({ email: email });
          if (emailUser) {
            req.flash("error_msg", "The Email is already in use.");
            res.redirect("/users/signup");
          } else {
            // Saving a New User
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            res.json('user created')
            req.flash("success_msg", "You are registered.");
            res.redirect("/users/signin");
          }
        }
        
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json('User created');
    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }
};

userController.signin = passport.authenticate("local", {
  successRedirect: "/", 
  failureRedirect: "/users/signin",
  failureFlash: true,
});

module.exports = userController;