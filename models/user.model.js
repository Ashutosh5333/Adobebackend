const mongoose = require("mongoose")


const  userSchema = mongoose.Schema({
        name : { type: String, required: true },
        email: { type: String, required: true, min: 4, unique: true },
        password: { type: String, required: true },
        pic:String,
        role:{type:String,default:"user"},   
},{
    timestamps:true,
})

 const Usermodel = mongoose.model("user", userSchema)

  module.exports={
     Usermodel
  }











