const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { Usermodel } = require("../models/user.model")



const UserRouter= express.Router()

  
  // ----------  user get data ----------- //

UserRouter.get("/users", async (req,res) =>{
        try{
         const user = await Usermodel.find()
           res.send(user)
        }catch(err){
          console.log(err)
        }
   })


    // ----------- user post  ---------------- // 


   UserRouter.post("/users/create", async (req,res) =>{
    const {email,password,name,pic}= req.body

       const  userpresent = await Usermodel.findOne({email})
             if(userpresent){
              res.send("user is already present")
              return
             }
               try{
                bcrypt.hash(password, 4, async function(err, hash) {
                  const user = new Usermodel({email,password:hash,name,pic})
                  await user.save()
                  res.send("Signup successfully")
              })
               }catch(err){
                  console.log(err)
                  res.send("Something went wrong ply try again later")
               }
     })

     UserRouter.post("/users/login", async(req,res) => {
      const {email,password,name,pic} = req.body;
      try{
        
       const user = await Usermodel.find({email})
        
         if(user.length > 0){
            const hashed_password = user[0].password;
        
            bcrypt.compare(password,hashed_password,function(err, result){
                if(result){
                    const token= jwt.sign({userId:user[0]._id}, process.env.key);
                    res.send({"msg":"Login sucessfull", "token":token ,data:{email,name,pic}  })
                }
                else{
                  res.send("Please check password")
                }
     
            }) }
            else{
              res.send("first registered")
            }
      }
      catch{
        res.send("authentication failed 3")
      }
     })
     
     





     UserRouter.patch("/users/update/:Id", async(req,res) =>{
        const dataId = req.params.Id
        const payload = req.body;
     try{
           await Usermodel.findByIdAndUpdate({_id:dataId},payload)
           res.send({"msg":"update data sucessfully"})
     }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
     }

      
})
    
   
UserRouter.delete("/users/delete/:Id",  async(req,res) =>{
   const dataId = req.params.Id
     try{
           await Usermodel.findOneAndDelete({_id:dataId})
           res.send({"msg":"Delete data  sucessfully"})
         
     }catch(err){
       console.log(err)
       res.send({"msg":"user delete successfully"})
     }

      
})



   module.exports={
    UserRouter
   }