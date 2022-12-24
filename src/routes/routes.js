const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");

// for testing purpose only to store user registration info
// Don't use for production
const user = [];

route.get("/", (req, res) => {
  res.render("index");
});

route.get("/register", (req, res) => {
  res.render("register");
});

route.get("/login", (req, res) => {
  res.render("login");
});

// registering user
route.post("/register", async (req, res) => {
  try {
    // hasing password. always hashed your password before storing in database
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    user.push({
      id: Date.now().toString(), //for unique id
      email: req.body.email,
      password: hashedpassword,
    });
    res.redirect("/"); //render home page if registration successfull
  } catch (e) {
    //if error
    console.log(e);
  }
});

// logging in user
route.post("/login", async (req, res) => {
  try {
    const userId = req.body.email;
    const password = req.body.password;

    // check if user exist or not
    const validUser = user.find((user) => user.email == userId);
    if (validUser == null) {
      //if there is no user
      res.send("no user with that id");
    } else {
      const result = await bcrypt.compare(password, validUser.password); //comparing password
      if (result) {
        res.redirect("/"); //redirect user to home page after successfull login
      } else {
        res.send("invalid credentials");
      }
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
