const User=require('../models/user')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../key')
const Joi=require('joi')
const validation= require('../validation/validation')
const loginvalidation=require('../validation/loginvalidation')
const validatepassword=require('../validation/changePasswordValidation')
const validateUpdate=require("../validation/updateUser")

exports.createUser=async(req,res)=>{
    const {error} = validation(req.body)
    if(error) return res.send(error.details[0].message).status(400)
    let password=await req.body.password
    let salt=await bcrypt.genSalt(5)
    let hashedPassword=await bcrypt.hash(password,salt)
    let newUser=await new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    let email=await User.findOne({email:req.body.email})
     if(email){
        res.status(200).send("The user with that email arleady exists")
    }
    else{

        await newUser.save();
        res.status(200).send(newUser)
    }
}

exports.login=async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).send("please add email or password")
    }
    const {error} = loginvalidation(req.body)
    if(error) return res.send(error.details[0].message).status(400)
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(200).send("Invalid Email or password")
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following,avatar,Bio} = savedUser
               res.json({token,user:{_id,name,email,followers,following,avatar,Bio}})
               
            }
            else{
                return res.status(200).send("Invalid Email or password")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}
exports.getAllUsers=async(req,res)=>{
    User.find() 
    .then((users)=>{
        res.json({users})
        console.log(users);

    }).catch(err=>{
        console.log(err)
    })
}


exports.updateUser=async(req,res)=>{
   const {error} = validateUpdate(req.body)
   if(error) return res.send(error.details[0].message).status(400)
   console.log(req.user._id)
   let user = await User.findById(req.user._id)
   if(!user) return res.send('Invalid username or password').status(400)
 else{     
      
             user.name=req.body.name
             user.username=req.body.username
             user.email=req.body.email
            
            await user.save()
       
             res.send("The account has been update")
         }
     }
 
    
 
     exports.changePassword=async(req,res)=>{
   
     try{
   
       var Email=req.body.email
         var oldPassword=req.body.oldPassword
         var newPassword=req.body.newPassword
         var confirmPassword=req.body.confirmPassword
         const {error} = validatepassword(req.body)
         if(error) return res.send(error.details[0].message).status(400)
         const user = await User.findOne({email:Email})
         if (!user) {
             return res.send('There is no user selected')
         }
         var hash =user.password
         bcrypt.compare(oldPassword,hash)
 
         .then(async(isMatch)=>{
           if(!isMatch){
             res.send("invalid passsword")
           }
           if (newPassword==confirmPassword) {
             const hashedpwd= await  bcrypt.hash(newPassword,10)
             user.password= hashedpwd
             // console.log(user.password)
              await user.save()
             .then(()=>{
                 res.send("The password was changed successfully")
                 console.log("The password changed well")
             })
         }
         else{
           res.send("The passwords are not the same")
         }
         })
    .catch(()=>{
      res.send("nooooooooooooo")
    })
          
     }catch(err){
         res.send({
             message: err.message
           
         })
     }
 }
 
 exports.getUserById=async(req,res)=>{
  try {
      const user = await User.findById(req.params.id);
      res.send(user);
    } catch {
      res.status(404);
      res.send({ error: "User doesn't exist!" });
    }
}
 exports.getUserInfo = async(req,res)=>{
    try {
      let user = await User.findById(req.user);
      let result  = user;
      return res.status(200).send({
        _id: result?._id,
        email: result?.email,
        username: result?.username
      
      });
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }

 exports.logout=async(req,res)=>{
   const refreshToken =req.user.token;
 jwtr.destroy(token)
   res.status(200).json("you are successivelly logged out")
}