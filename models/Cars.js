import mongoose from 'mongoose'
const carSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   color:{
    type:String
   },
   by:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
   }
    
})

mongoose.model("Car",carSchema)