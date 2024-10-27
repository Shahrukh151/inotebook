const express=require('express');
const router=express.Router();
const babel=require('@babel/core');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET='Shahrukh$heikh';


// Route 1:Creat a User Using POST "/api/auth/createuser" no login required using express router
router.post('/createuser',[
  // In this array the below  line of code  show validation of user 
    body('name','Enter  valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 character').isLength({ min: 5 })
],async (req,res)=>{
  // If there are some error,return bad request and the error with express validator package
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check wheather user with this email exist already
    try {
    let user=await User.findOne({email:req.body.email})
    if(user){
      return res.status(400).json({error:"Sorry user this email already exist"})
    }
    // methos to encrypt password through bcrypt package
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);
    // create new user
        user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data={
        user:{
          id:user.id
        }
      }
      // method to verifying user using JS authentication package
      const authtoken=jwt.sign(data,JWT_SECRET);
      // console.log(jwtData);
            //res.json(user)
            res.json(authtoken)
               
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
    
})

// Route 2:Login a User Using POST "/api/auth/Loginuser" no login required
router.post('/Loginuser',[

  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
],async (req,res)=>{

// If there are some error,return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}
 const {email,password}=req.body;
try {
  let user= await User.findOne({email});
  if(!user){
    return res.status(400).json({error:'Please try with correct credentials'});
  }
  const passwordCompare= await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    return res.status(400).json({error:'Please try with correct credentials'});
  }
  const data={
    user:{
      id:user.id
    }
  }
  const authtoken=jwt.sign(data,JWT_SECRET);
  res.json(authtoken);
} 

catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error occured");
}

})

// Route 3: Get loggedin user detail using post  "/api/auth/getuser" login required
router.post('/getuser', fetchuser,async (req,res)=>{
 try {
  const userId=req.user.id;
  const user= await User.findById(userId).select('-password');
  res.send(user);
 } 
 
 
 catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error occured");
}

})
module.exports=router


