// import mongoose from 'mongoose';

const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, required: true },
});

// const User = model('User', userSchema);

// export default User;
module.exports = mongoose.model('User', userSchema);