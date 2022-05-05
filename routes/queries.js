const express = require('express')
const router = express.Router()
const QueriesController=require("../controllers/queries")
const requireLogin = require('../middleware/requireLogin')


router.post("/queries",QueriesController.createQuery)
router.get('/queries',requireLogin,QueriesController.getAllQueries)

module.exports=router



