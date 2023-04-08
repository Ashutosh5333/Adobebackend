

mongoose=require("mongoose")
require("dotenv").config()

  const Connection = mongoose.connect(process.env.mongourl)

  module.exports={
    Connection
  }
  