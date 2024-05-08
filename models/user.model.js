const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email cannot be empty'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: [true, 'Email has already been taken by another user'],
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
    },
    
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('User', authSchema);
