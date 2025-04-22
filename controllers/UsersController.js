const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  // Add login logic here
};

module.exports = { registerUser, loginUser };
