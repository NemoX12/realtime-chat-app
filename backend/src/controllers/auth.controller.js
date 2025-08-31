import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";

import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Fields can't be empty!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be atleast 6 characters!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        photoUrl: newUser.photoUrl,
        friendsList: newUser.friendsList,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ error: "User doesn't exist" });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      return res.status(403).json({ error: "Passwords don't match" });
    }

    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      photoUrl: user.photoUrl,
      friendsList: user.friendsList,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, firstName, lastName } = req.body;

    if (!profilePic && !firstName && !lastName) {
      return res.status(400).json({ error: "Fields can't be empty" });
    }

    let updateFields = {};

    if (profilePic) {
      const uploadedImage = await cloudinary.uploader.upload(profilePic);
      updateFields.photoUrl = uploadedImage.secure_url;
    }

    if (firstName) {
      updateFields.firstName = username;
    }

    if (lastName) {
      updateFields.lastName = lastName;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(400).json({ error: "You aren't authenthificated" });
    }

    res.cookie("jwt", null, { maxAge: 0 });
    res.status(201).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
