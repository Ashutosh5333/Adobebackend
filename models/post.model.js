const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
        title:String,
        content:String,
        pic:String,
        userId:String,
        postedby:{type:mongoose.Types.ObjectId,ref:"user",required:true}
}
,{
        timestamps:true,

})


 const PostModel = mongoose.model("post", postSchema)

  module.exports={
    PostModel
  }












