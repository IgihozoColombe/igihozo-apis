const express = require('express')
const router = express.Router()
const UserController=require("../controllers/user")
const requireLogin = require('../middleware/requireLogin')
const isAdmin=require("../middleware/isAdmin");

router.get('/',(req,res) => {
    res.send("welcome to my app")
})
router.post('/signup',UserController.createUser)
router.post('/signin',UserController.login)
router.post('/logout',requireLogin,UserController.logout)
router.get('/users',requireLogin,UserController.getAllUsers)
router.put('/updateUser',requireLogin,UserController.updateUser)
router.put('/changePassword',requireLogin,UserController.changePassword)

module.exports=router



