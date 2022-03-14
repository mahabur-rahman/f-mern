const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
require("../db/conn");

// route
router.get("/", (req, res) => {
  res.send("<h1>home page</h1>");
});

// POST METHOD | register route

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
      return res.status(422).json({ error: "Please fill all data field" });
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    } else {
      // create a new user
      const newUser = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      // hash password | bcryptjs ❤️

      // save user on db
      await newUser.save();
      // const saveUser = await newUser.save();
      // console.log(`${newUser}: After save method 👍`);
      // console.log(`save user : ${saveUser}`);

      res.status(201).json({ message: `Register Successful` });
    }
  } catch (err) {
    console.log(`Register save method last error : ${err}`);
  }
});

// POST METHOD | signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please fill both the field",
      });
    }

    const loginUser = await User.findOne({ email: email });
    // console.log(loginUser);

    if (loginUser) {
      // compare hash password ❤️
      const isMatch = await bcrypt.compare(password, loginUser.password);
      // console.log(isMatch);

      // jwt token generate ✔️✔️
      const token = await loginUser.generateAuthToken();
      console.log(`Generate token : ${token}`);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Login Error pass" });
      } else {
        res.json({
          message: "User login successful",
        });
      }
    } else {
      res.status(400).json({ error: "Login Error" });
    }
  } catch (err) {
    console.log(`SignIn method last error : ${err}`);
  }
});

// middleware for about page | authenticate ✔️

// about page
router.get("/about", authenticate, (req, res) => {
  console.log("about page execute with authenticate func");
  res.send(req.rootUser);
});

// get data for contact us page and home page
router.get("/getdata", authenticate, (req, res) => {
  console.log("getdata for conact us page");
  res.send(req.rootUser);
});

// contact us page

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "please fill all field" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "User contact form successfully send" });
    }
  } catch (err) {
    console.log(err);
  }
});

// logout page
router.get("/logout", (req, res) => {
  console.log("logout successful");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

// export
module.exports = router;
