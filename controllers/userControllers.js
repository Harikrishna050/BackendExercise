const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')

const getweb = asyncHandler(async (req, res) => {
  return res.json({"haru":"jansj"})
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('please fill all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  }
  else {
    res.status(404);
    throw new Error('Invalid user data');
  }
})


const getMe = asyncHandler(async (req, res) => {
  // const {_id,name,email}=await User.findById(req.user.id);
  res.json(req.user
  );
})


const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  LoginUser,
  getMe,
  getweb,
}