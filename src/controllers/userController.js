// Importing required models and libraries
require("dotenv").config();
const User = require("../models/userModel");
const Shop = require("../models/shopModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Utilisation de bcryptjs à la place de bcrypt

// Setting the number of salt rounds for password hashing
const saltRounds = 10;

// Controller function to handle user registration
exports.userRegister = async (req, res) => {
  try {
    // Creating a new user instance with the request body
    let newUser = new User(req.body);
    let userPwd = newUser.password;

    // Generating a salt and hashing the user's password
    let hash = await bcrypt.hash(userPwd, saltRounds); // Utilisation de bcryptjs pour le hashage du mot de passe

    // Updating the user's password with the hashed version
    newUser.password = hash;

    if (!(await User.findOne({ email: req.body.email }))) {
      // Saving the user to the database
      let user = await newUser.save();
      res.status(201).json({ message: `User created: ${user.email}` });
    } else {
      res.status(592).json({ message: `Adresse Email deja utilisée` });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid request" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    // Finding the user by email in the database
    const user = await User.findOne({ email: req.body.email });

    // Handling the case where the user is not found
    if (!user) {
      res.status(500).json({ message: "User not found" });
      return;
    }

    // Comparing the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    ); // Utilisation de bcryptjs pour comparer les mots de passe

    // Handling successful login
    if (passwordMatch) {
      // Creating a JWT token containing user information
      const userData = {
        id: user._id,
        email: user.email,
        name: user.name,
      };

      // Signing the JWT token with the secret key and setting an expiration time
      console.log(process.env.JWT_KEY);
      const token = await jwt.sign(userData, process.env.JWT_KEY, {
        expiresIn: "180d",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Incorrect email or password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during processing." });
  }
};

// Controller function to delete a user
exports.deleteAUser = async (req, res) => {
  try {
    // Finding the user by ID
    const user = await User.findById(req.params.id_users);

    // If user not found, respond with an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Deleting all shops associated with the user
    await Shop.deleteMany({ _id: { $in: user.user_shop } });

    // Deleting the user
    await User.findByIdAndDelete(req.params.id_users);

    res.status(202).json({ message: "User and associated shops deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller function to update a user's information
exports.updateAUser = async (req, res) => {
  try {
    const userUpdate = req.body;

    // Hashing the new password if present in the update
    if (userUpdate.password) {
      userUpdate.password = await bcrypt.hash(userUpdate.password, saltRounds); // Utilisation de bcryptjs pour le hashage du nouveau mot de passe
    }

    // Updating the user in the database
    const user = await User.findByIdAndUpdate(
      req.params.id_users,
      { $set: userUpdate },
      { new: true } // Returning the modified document
    );

    // Handling the case where the user is not found
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(203).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller function to list a users
exports.listAUsers = async (req, res) => {
  try {
    // Retrieving all users from the database
    const users = await User.findById(req.params.id);
    res.status(200);
    res.json(users);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Server error." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id_users;

    // Find user by ID
    const user = await User.findById(userId).populate("user_shop"); // Populate user_shop if needed

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user details
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to list all users
exports.listAllUsers = async (req, res) => {
  try {
    // Retrieving all users from the database
    const users = await User.find({}).populate("user_shop");
    res.status(200);
    res.json(users);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Server error." });
  }
};

// Controller function to get a user by email
exports.getUserByEmail = async (req, res) => {
  try {
    // Finding the user by email in the database
    const user = await User.findOne({ email: req.params.email });

    // Handling the case where the user is not found
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Controller function to update a user's password
exports.updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id_users;

    console.log(userId);
    console.log(currentPassword, newPassword);

    // Fetch user from database
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password matches
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      console.log(`Incorrect current password for user: ${userId}`);
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;

    // Save updated user
    await user.save();
    console.log(`Password updated successfully for user: ${userId}`);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(`Error updating password for user: ${userId}`, error);
    res
      .status(500)
      .json({ message: "An error occurred during password update" });
  }
};
