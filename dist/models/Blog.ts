import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    message: string;
    picture: string[];
}

const BlogSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    picture: {
        type: [String],
        required: true,
    },
});

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
