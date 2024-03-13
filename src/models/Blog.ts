import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },


  image: {
    type: String,
    required:false,
  },
});

export const Blog = mongoose.model("Blog", BlogSchema);
