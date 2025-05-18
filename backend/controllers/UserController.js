import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getUser(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'username'] // Exclude sensitive fields
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ 
      status: "Error", 
      message: error.message 
    });
  }
}

// Register new user
async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        status: "Error", 
        message: "Email already registered" 
      });
    }
    
    // Hash the password
    const encryptedPassword = await bcrypt.hash(password, 10); // Use a higher salt rounds for stronger security
    
    // Create new user
    const newUser = await User.create({
      email,
      username,
      password: encryptedPassword,
      refresh_token: null
    });
    
    // Return success but don't include password in response
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    
    res.status(201).json({
      status: "Success",
      message: "Registration successful",
      data: userWithoutPassword
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ 
      status: "Error", 
      message: error.message 
    });
  }
}

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({
        where: { email }
      });
  
      if (!user) {
        return res.status(400).json({ status: "Error", message: "Invalid email or password" });
      }
  
      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(400).json({ status: "Error", message: "Invalid email or password" });
      }
  
      // Prepare user data (exclude sensitive fields)
      const userPlain = user.toJSON();
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;
  
      // Generate access token
      const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s"
      });
  
      // Generate refresh token
      const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
      });
  
      // Update user refresh token in DB
      await User.update(
        { refresh_token: refreshToken },
        { where: { id: user.id } }
      );
  
      // Set refresh token in cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // Make sure it's not accessible from JavaScript
        sameSite: "None", // Required for cross-site cookies
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: true, // Set to true only for HTTPS
      });
  
      res.status(200).json({
        status: "Success",
        message: "Login successful",
        data: safeUserData,
        accessToken,
      });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
}
  
async function logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
  
      // If no refresh token, return 204 (No Content)
      if (!refreshToken) return res.sendStatus(204);
  
      // Find the user with the matching refresh token
      const user = await User.findOne({
        where: { refresh_token: refreshToken }
      });
  
      if (!user) {
        return res.sendStatus(204); // If user is not found
      }
  
      // Remove refresh token from DB
      await User.update(
        { refresh_token: null },
        { where: { id: user.id } }
      );
  
      // Clear refresh token from cookie
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true, // Ensure cookies are cleared on HTTPS
      });
  
      res.sendStatus(200); // Return success status
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
}

export { login, logout, getUser, register };