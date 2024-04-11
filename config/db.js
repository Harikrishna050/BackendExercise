const mongoose = require('mongoose')
const colors = require('colors');
const dotenv = require('dotenv').config();

const MONGO_URI="mongodb+srv://harikrishna050code:hari050@hari.dzogve1.mongodb.net/mernapp?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB