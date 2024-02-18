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

  picture: {
    type: Array,
    required: true,
  },
});

export const Blog = mongoose.model("Blog", BlogSchema);
