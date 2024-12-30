export const signupUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmedPassword, gender } =
      req.body;
  } catch (error) {}
};

export const loginUser = (req, res) => {
  res.send("login");
};

export const logoutUser = (req, res) => {
  res.send("logout");
};
