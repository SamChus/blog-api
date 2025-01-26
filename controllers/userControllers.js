const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require('fs')

const test = (req, res) => {
  res.send("Hello World");
};

//Auth Flow
// Register a new user
// Login a user
// Verify a user email
// Forgot password
// Reset password


//User Flow
// Get all users
// Get a single user
// Update a user
// Delete a user
// Get all posts by a user

const createUser = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    firstname,
    lastname,

    email,
    password: hashedPassword,
  });

  const result = await newUser.save();
  res.status(201).json({
    message: "User created successfully",
    data: {
      user: result,
    },
  });
};

const loginUser = async (req, res) => {
  //get user email and password
  const { email, password } = req.body;

  //check if user exists in the database
  const user = await User.findOne({ email });

  //if user does not exist, send error message
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }
  //compare password
  const validPassword = await bcrypt.compare(password, user.password);
  //if password is invalid, send error message
  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  //generate token
  const token = user.generateToken();

  res.header("x-auth-token", token).send({
    message: "User logged in successfully",
    token,
  });
};


//Verify email
const verifyEmail = async (req, res) => {
  const { email } = req.body;

  //check if user exists in the database
  const user = await User.findOne({ email });

  //if user does not exist, send error message
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }


  //generate token
  const token = user.generateToken();

  //send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:
      {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },

  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Click on the link to verify your email: http://localhost:3000/verify/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
        message: "Email sent successfully",
        data: {
          info,
        },
      });
    }
  }

  );

};

//Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //check if user exists in the database
  const user = await User.findOne({ email });

  //if user does not exist, send error message
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  //send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    text: `Click on the link to Reset Password: http://127.0.0.1:5500/frontend/reset-password.html`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
        message: "Reset Password Link sent successfully",
        data: {
          info,
        },
      });
    }
  });
};

//reset password
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // const result = await User.findOneAndUpdate({ email }, { password: hashedPassword });
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    message: "Password reset successfully",
  });
}

const uploadImage = async (req, res) => {
 try {
   const files = req.files;

   if (!files || files.length === 0) {
     return res.status(400).json({ error: "No files uploaded" });
   }

   console.log(files);
   

   const uploadPromises = files.map((file) => cloudinary.uploader.upload(file.path))

   const uploadResults = await Promise.all(uploadPromises);

   files.forEach((file) => {
     fs.unlinkSync(file.path); 
   });

   const uploadedFiles = uploadResults.map((result) => result.secure_url);

   res.status(200).json({
     message: "Files uploaded successfully",
     uploadedFiles,
   });
 } catch (error) {
   console.error(error);

   if (req.files) {
     req.files.forEach((file) => {
       fs.unlinkSync(file.path);
     });
   }

   res.status(500).json({ error: "Something went wrong during the upload" });
 }

}


const profilePicture = async (req, res) => {

  const userId = req.user.id

  const user = await User.findById(userId);

  if (!req.file) {
    res.status(400).send("No file added");
  }

  const uploadRes = await cloudinary.uploader.upload(req.file.path);

  user.profilePicture = uploadRes.secure_url;
  const result = await user.save()

  console.log(result);
  

  res.status(201).json({
    message: "Image uploaded successfully",
    imageUrl: result
  });
};

  






module.exports = {
  test,
  createUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  uploadImage,
  profilePicture
};
