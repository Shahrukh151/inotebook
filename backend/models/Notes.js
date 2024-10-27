const mongoose = require('mongoose');
//import mongoose from 'mongoose';

const NotesSchema = mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
       default:"Genral"
    },
    Date:{
        type:Date,
        default:Date.now
    }
  });

  module.exports=mongoose.model('notes',NotesSchema);