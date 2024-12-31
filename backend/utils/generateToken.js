import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  //payload : userId
  //key for signing
  //expiration date
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
    httpOnly: true, //users cannot access this cookie with js =>prevent XSS attacks
    sameSite: "strict", // for CSRF attacks
    secure: process.env.NODE_ENV !== "development", //in dev we are using http not https
  });
};

export default generateTokenAndSetCookie;
