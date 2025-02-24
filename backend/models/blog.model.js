import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    coverImage: {type: String},
    createdBy: {type: Schema.types.ObjectId, ref: "user"}
},{timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;