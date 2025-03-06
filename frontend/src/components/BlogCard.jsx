import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog._id}`} className="block">          {/*when this card component will be clicked it will open the blog post page for that particualr blog */}
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm cursor-pointer 
                 transition-transform duration-300 ease-in-out hover:shadow-lg 
                 hover:-translate-y-1 relative"
      >
        {/* Cover Image */}
        <img
          src={blog.coverImage !== "null" ? blog.coverImage : "/avatar.png"}
          alt="Blog Cover"
          className="w-full h-48 object-cover"
        />

        {/* Blog Info */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">{blog.title}</h2>
          <p className="text-gray-500 text-sm">
            By {blog.createdBy?.fullname || "Unknown"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
