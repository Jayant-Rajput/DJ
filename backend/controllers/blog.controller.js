import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
export const addBlog = async(req,res) => {
    const{title, content} = req.body;
    try{
        const newBlog = new Blog({
            title,
            content,
            createdBy: req.user._id
        })
        await newBlog.save();
        res.status(201).json({ message: "new Blog created successfully" });

    }catch(error){
        console.log("Error in addBlog controller: ", error);
        res.status(500).json({ message: "Error in creating new blog" });
    }
}

export const getAllBlogs = async(req,res) => {
    try{
        const blogs = await Blog.find().populate("createdBy","fullname");  //populate 
        res.status(200).json(blogs);
    }catch(error){
        console.log("Error in getAllBlogs controller: ", error);
        res.status(500).json({message: "Error in fetching All Blogs"});
    }
}

export const getBlog = async(req,res) => {
    const blogid = req.params.blogid;
    try{
        console.log("blogid: ", blogid);
        const blog = await Blog.findById(blogid).populate("createdBy","fullname");
        console.log(blog);
        res.status(200).json(blog);
    }catch(error){
        console.log("Error in getBlog controller: ", error);
        res.status(500).json({message: "Error in fetching Blog with id"})
    }
}
