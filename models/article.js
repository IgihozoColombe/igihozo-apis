const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
	required:true
  },
    body:{
        type:String,
        required:true
    },
    status:{
      type:String,
      required:true
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  likes:[{type:ObjectId,ref:"User"}],

  comments:[{
      text:String,
      postedBy:{type:ObjectId,ref:"User"}
  }],
  
  postedBy:{
    type:ObjectId,
    ref:"User"
 }
},{timestamps:true})

module.exports = mongoose.model("Article", articleSchema)