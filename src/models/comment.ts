import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
  message: {
    type: String,
    required: true,
  },

});

export const Comment = mongoose.model("Comment",CommentSchema);