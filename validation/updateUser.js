const express = require('express')
const Joi=require('joi')
function validateUpdate(req) {
    const Schema=Joi.object({
      name: Joi.string().required(true).min(3).max(50),
      username:Joi.string().required().max(20).min(3),  
      email:Joi.string().max(30).min(10).required().email(),
    })
return Schema.validate(req)
    }
    module.exports = validateUpdate