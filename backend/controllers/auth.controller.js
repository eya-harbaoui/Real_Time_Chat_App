import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

//******************signup controller***********************************

export const signupUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmedPassword, gender } =
      req.body;
    //Verify if passwords are matching
    if (password != confirmedPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    //Verify if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    //hash password : salt is a random value that is combined with the password before hashing : 2 similar passwords => diff hash
    const salt = await bcryptjs.genSalt(10); // a higher salt num = secure password but not a big one because it's make it slower
    const hashedPassword = await bcryptjs.hash(password, salt);
    //get rendom profile pic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName: fullName,
      username: username,
      password: hashedPassword,
      gender: gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });
    //save the document into mongoDB (save is a mongoose method)
    if (newUser) {
      // generate JWT token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
    }
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//******************login controller***********************************

export const loginUser = async (req, res) => {
  try {
    const { password, username } = req.body;
    //find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    //verify password
    const isValidPassword = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//******************logout controller***********************************

export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
