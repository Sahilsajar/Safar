const router = require("express").Router();
const user = require("../model/userModel");

//To directlty not store password in db we use to hash the pass with bcrypt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//Register a new user
router.post("/register", async (req, res) => {
  try {
    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User Already exist",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashPassword;

    const newUser = new user(req.body); // object is made for model
    await newUser.save(); // now saved into the database.

    return res.status(200).send({
      message: "Created new user successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json("Unable to upload");
  }
});

//user Log in Route

router.post("/login", async (req, res) => {
  try {
    const existingUser = await user.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.send({
        message: "user Does not exist",
        success: false,
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!passwordMatch) {
      return res.send({
        message: "Incorrect Password",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign({ userId: existingUser._id }, "safar", {
      expiresIn: "1d",
    });

    return res.send({
      message: "logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    return res.status(500).json("Unable to Logged in");
  }
});

//Get by id

router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const euser = await user.findById(req.body.userId);
    return res.send({
      message: "User fetch successfully",
      success: true,
      data: euser,
    });
  } catch (error) {
    res.send({
      message: "Does not exist",
      success: false,
    });
  }
});

module.exports = router;
