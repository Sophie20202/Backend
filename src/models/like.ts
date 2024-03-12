import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({


  blogId:{
    type:String,
    required:true,
  },
  userlike:{
    type:Boolean,
    default:true
  },

});

export const like= mongoose.model("like",likeSchema);