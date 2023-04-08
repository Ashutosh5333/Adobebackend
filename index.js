   
const express = require("express")
const cors = require("cors")
const { Connection } = require("./config/db")
const { UserRouter } = require("./routes/user.route")
const { PostRouter } = require("./routes/post.route")
const app = express()
app.use(express.json())


app.get("/" , (req,res) => {
  res.send("welcome home")
})


app.use(UserRouter)
app.use(PostRouter)



      
    app.listen(8000, async(req,res) =>{
           try{
             await Connection;
              console.log("connected on database")
            }catch(err){
                console.log(err)
                console.log("something went wrong in connected")
            }
            console.log("listen on port 8000")
    })

