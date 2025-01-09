import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  //next is a function used to pass to the next middlware or next route
  try {
    //get the token from the cookie
    const token = req.cookies.jwt;
    //console.log("token", token);
    //verify if the token exist
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - no token provided" });
    }
    //decode token and verify its authenticity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    //get the user info by Id (password not included)
    const user = await User.findById(decoded.userId).select("-password");
    //in the req object we add the user as a key "user"
    req.user = user;
    //pass to the next middleware (for example in sendMessage controller next will pass to sendMessage)
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware :", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export default protectRoute;
