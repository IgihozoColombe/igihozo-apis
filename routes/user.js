const express = require('express')
const router = express.Router()
const UserController=require("../controllers/user")
const requireLogin = require('../middleware/requireLogin')
const getLoggedUser = require("../middleware/getLoggedIn");
const isAdmin=require("../middleware/isAdmin");

router.get('/',(req,res) => {
    res.send("welcome to my app")
})
router.post('/signup',UserController.createUser)
router.post('/signin',UserController.login)
router.get('/users',requireLogin,UserController.getAllUsers)
router.get("/:id",requireLogin,UserController.getUserById);
router.put('/updateUser',requireLogin,UserController.updateUser)
router.put('/changePassword',requireLogin,UserController.changePassword)
router.get("/loggedinuser",requireLogin,UserController.getUserInfo)
router.post('/logout',requireLogin,UserController.logout)
module.exports=router



