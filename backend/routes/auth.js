import express from 'express';
import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {  body , validationResult } from 'express-validator';
import fetchuser from '../middlewares/fetchuser.js';


const router = express.Router();
const SECRET = 'satyaisag@@db@y'

//we can access whatever user writes in text field by using req.body.<name> , here <name> is the neame key that is given while using post request via form.....but while using postman <name> is the key of the key-value pair.



//ROUTE 1 : Create a User using: POST "/api/auth/createUser"
//sign_up
router.post('/createUser', [
   body('name', 'Enter your full Name valid Name').isLength({min : 5}),
   body('email', 'Enter a valid email').isEmail(),
   body('password','Password must be atleast 5 characters').isLength({min : 5}),
],
async (req, res)=>{

  //if there are errors then return Bad requests and the errors
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({erros: errors.array()});
  }

  //check whether the user with this email exists
  try{
    let user = await User.findOne({email: req.body.email})
  if(user){
    return res.status(400).json({eorr: "Sorry a user with this email already exists"});
  }

  //if everthing goes write then user is created and saved in Database

  //using hashing and salting using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const Hashpass = await bcrypt.hash(req.body.password , salt);
  user = await User.create({
    name: req.body.name,
    password: Hashpass,
    email: req.body.email
  });
  
  //if password and email is verified then send the authentication token
  const data = {
    user : {
      id: user.id,
    }
  };

  const authToken = jwt.sign(data, SECRET);
  res.send(authToken);
  }
  catch(error){
    return res.status(500).json({error : error.message});
  }
});









//ROUTE 2 : user login using credentials using: POST "/api/auth/login"
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password','Password can not be blank').exists(),
],
async (req, res)=>{

 //if there are errors then return Bad requests and the errors
 const errors = validationResult(req);
 console.log(errors);
 if (!errors.isEmpty()) {
   return res.status(400).json({erros: errors.array()});
 }

//destructuring the req.body since it has values of email and password entered by the user 
 const {email, password} = req.body ;

 try{

   let user = await User.findOne({email});
   if(!user){
    res.status(400).json({error : 'Please try to login with correct credentials'});
   }
  
   
   //compare the entered password with the password that we have on database using bcrypt.compare
   const passwordCompare = await bcrypt.compare( password, user.password );
   if(!passwordCompare ){
    return res.status(400).json({error : 'Please try to login with correct credentials'})
   }


   //if password and email is verified then send the authentication token
   const data = {
    user : {
      id: user.id,
    }
  };

  const authToken = jwt.sign(data, SECRET);
  res.send(authToken);


 }
 catch(error){
  return res.status(500).json({error : error.message});
  console.log(error);
}
});













//ROUTE 1 : TO get Logged in User details using: POST "/api/auth/getUser"


router.post('/getUser',fetchuser, async (req, res)=>{

try {


  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);

} catch (error) {
  
  return res.status(500).json({error : error.message});
  console.log(error);
}
});



export default router;

