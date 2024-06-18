import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();
    res.status(200).json({ 
        message: "user is created", 
        data: saveUser 
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({ 
        message: "Email or Password is wrong!" });
    }
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ 
        message: "Email or Password is wrong!" });
    }
    const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      message: "user logedIn",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
