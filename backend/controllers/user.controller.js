import User from "../models/user.model.js";
export const getAllUsers = async (req, res) => {
  try {
    //get the logged in user Id (provided by protect route)
    const loggedInUserId = req.user._id;
    //find all users not equal to the current authenticated user
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error in getting users controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
