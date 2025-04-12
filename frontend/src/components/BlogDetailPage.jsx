import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { useBlogStore } from "../stores/useBlogStore";

const BlogDetails = () => {
  const { blogid } = useParams();  //url se blog id mil jygi.

  const {getBlog, isFetchingBlog, currentBlog} = useBlogStore();
  
  useEffect(() => {
    getBlog(blogid);
  }, [blogid]);

  if(isFetchingBlog || !currentBlog){
    return <h1>Please wait for a while</h1>
  }
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <img src={currentBlog.coverImage !== "null" ? currentBlog.coverImage : "/avatar.png"} alt="Cover" className="w-full h-64 object-cover rounded-md" />
      <h1 className="text-2xl font-bold mt-4">{currentBlog.title}</h1>
      <p className="text-gray-500">By {currentBlog.createdBy?.fullname || "Unknown"}</p>
      <div className="prose max-w-none mt-4">{parse(currentBlog.content)}</div>
    </div>
  );
};

export default BlogDetails;