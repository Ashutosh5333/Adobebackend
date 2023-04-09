const express = require("express")
const { PostModel } = require("../models/post.model")
const { authenticate } = require("../middleware/authenticate")


const PostRouter= express.Router()
 

PostRouter.get("/Allpost",  async (req,res) =>{
  try{
   const post = await PostModel.find()
        .populate("postedby",["name","email","pic"])
     res.send(post)
  }catch(err){
    console.log(err)
    res.send("error in get  data")
  }
})


PostRouter.get("/Allpost/:Id",  async (req,res) =>{
  const  Id =  req.params.Id
  try{
   const post = await PostModel.findOne({_id:Id})
        .populate("postedby",["name","email","pic"])
     res.send(post)
  }catch(err){
    console.log(err)
    res.send("error in get  data")
  }
})






     // ------------- get post ------------------- //

 PostRouter.get("/post", authenticate, async (req,res) =>{
        try{
         const post = await PostModel.find({userId:req.body.userId})
              .populate("postedby",["name","email","pic"])
           res.send(post)
        }catch(err){
          console.log(err)
          res.send("error in get  data")
        }
   })


    // ------------ post create ---------------  //

   PostRouter.post("/post/create", authenticate, async (req,res) =>{
         const payload = req.body
         const userId=req.body.userId
               try{
                   const newpost = new PostModel({...payload,postedby:userId})
                       await newpost.save()
                       res.send({"msg" :"data created sucessfully"})
               }catch(err){
                  console.log(err)
                  res.send({"err":"Something went wrong"})
               }
     })



      // -------------- updated  -----------------  //


     PostRouter.patch("/post/update/:dataId", authenticate, async(req,res) =>{
     const dataId = req.params.dataId
     const userId=req.body.userId
     const payload = req.body;
     try{
      const postdata= await PostModel.findOne({_id:dataId})  
      if(userId!==postdata.userId){
        res.send("you are not authenticated")
      }else{
        await PostModel.findByIdAndUpdate({_id:dataId},payload)
        res.send({"msg":"update data sucessfully"})
      }
     }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
     }

      
})
    

  // -------------- Deleted  -----------------  //
   
PostRouter.delete("/post/delete/:Id", authenticate, async(req,res) =>{
   const dataId = req.params.Id
   const userId=req.body.userId
     try{
      const postdata= await PostModel.findOne({_id:dataId})  
      if(userId!==postdata.userId){
        res.send("you are not authenticated")
      }else{
        await PostModel.findOneAndDelete({_id:dataId})
        res.send({"msg":"delete data sucessfully"})
      }
     }catch(err){
       console.log(err)
     }

})


//  -----------  likes ------------ //


// PostRouter.put("/likes/:postId", authenticate, (req,res) =>{
//      const userId = req.body.userId
//      PostModel.findByIdAndUpdate(req.params.postId,{
//        $push:{likes:userId}
//      },{
//        new:true,
//      }).exec((err,result) =>{
//        if(err){
//         return res.status(422).json({error:err})
//        }
//        else{
//         res.json(result)

//        }
//      })

// })


PostRouter.put("/likes", authenticate, (req,res) =>{
  const userId = req.body.userId
  PostModel.findByIdAndUpdate(req.body.postId,{
    $push:{likes:userId}
  },{
    new:true,
  }).exec((err,result) =>{
    if(err){
     return res.status(422).json({error:err})
    }
    else{
     res.json(result)

    }
  })

})


  // ------------ unlikes ------------- //
   
PostRouter.put("/unlikes/:postId",authenticate, (req,res) =>{
  const userId = req.body.userId
  PostModel.findByIdAndUpdate(req.params.postId,{
    $pull:{likes:userId}
  },{
    new:true
  }).exec((err,result) =>{
    if(err){
     return res.status(422).json({error:err})
    }
    else{
     res.json(result)
    }
  })

})


   module.exports={
    PostRouter
   }