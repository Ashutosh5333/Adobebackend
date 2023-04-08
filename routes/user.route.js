const express = require("express")
const { Usermodel } = require("../models/user.model")



 const UserRouter= express.Router()

  



UserRouter.get("/users", async (req,res) =>{
        try{
         const user = await Usermodel.find()
           res.send(user)
        }catch(err){
          console.log(err)
        }
   })



   UserRouter.post("/users/create", async (req,res) =>{
         const payload = req.body
               try{
                   const newUser = new Usermodel(payload)
                       await newUser.save()
                       res.send({"msg" :"user created sucessfully"})
               }catch(err){
                  console.log(err)
                  res.send({"err":"Something went wrong"})
               }
     })



     UserRouter.patch("/users/update/:Id", async(req,res) =>{
        const userId = req.params.Id
        const payload = req.body;
     try{
           await Usermodel.findByIdAndUpdate({_id:userId},payload)
           res.send({"msg":"update data sucessfully"})
     }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
     }

      
})
    
   
UserRouter.delete("/users/delete/:Id",  async(req,res) =>{
   const userId = req.params.Id
     try{
           await Usermodel.findOneAndDelete({_id:userId})
           res.send({"msg":"Delete data  sucessfully"})
         
     }catch(err){
       console.log(err)
       res.send({"msg":"user delete successfully"})
     }

      
})



   module.exports={
    UserRouter
   }