const express = require('express')
const router = express.Router()
const QueriesController=require("../controllers/queries")
const requireLogin = require('../middleware/requireLogin')
const isAdmin=require("../middleware/isAdmin");

router.post("/queries",QueriesController.createQuery)
router.get('/queries',requireLogin,isAdmin,QueriesController.getAllQueries)

module.exports=router



