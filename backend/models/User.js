const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const UserSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
  });

  const User=mongoose.model('user',UserSchema);
  User.createIndexes();
  module.exports= User;
  // ready to go!