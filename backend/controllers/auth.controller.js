import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

//******************signup controller***********************************

export const signupUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmedPassword, gender } = req.body;
    //Verify if passwords are matching
    if (password != confirmedPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    //Verify if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }
    //hash password : salt is a random value that is combined with the password before hashing : 2 similar passwords => diff hash
    const salt = await bcryptjs.genSalt(10); // a higher salt num = secure password but not a big one because it's make it slower
    const hashedPassword = await bcryptjs.hash(password, salt);
    //get rendom profile pic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?email=${email}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?email=${email}`;

    const newUser = new User({
      fullName: fullName,
      email: email,
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
      email: newUser.email,
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
    const { password, email } = req.body;
    //find user by email
    const user = await User.findOne({ email });
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
      email: user.email,
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

export const updateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, fullName, email, currentPassword, newPassword } = req.body;

    // Accessing the uploaded file
    const profilePic = req.file;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Initialize update object
    const updates = {};

    // Handle password update if provided
    if (newPassword && currentPassword) {
      // Verify current password
      const isCurrentPasswordValid = await bcryptjs.compare(
        currentPassword,
        user.password
      );

      if (!isCurrentPasswordValid) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // Hash new password
      const salt = await bcryptjs.genSalt(10);
      updates.password = await bcryptjs.hash(newPassword, salt);
    }

    // Handle profile picture upload if provided
    if (profilePic) {
      try {
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(
          profilePic,
          "profile_pictures"
        );

        updates.profilePic = uploadResult.secure_url;
      } catch (cloudinaryError) {
        console.error("Profile picture upload error:", cloudinaryError);
        return res
          .status(400)
          .json({ error: "Failed to upload profile picture" });
      }
    }

    // Update other fields if provided
    if (fullName) updates.fullName = fullName;
    if (email) updates.email = email;

    // Only update if there are changes
    if (Object.keys(updates).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      ).select("-password");

      return res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    }

    return res.status(400).json({ error: "No updates provided" });
  } catch (error) {
    console.error("Error in update profile controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
