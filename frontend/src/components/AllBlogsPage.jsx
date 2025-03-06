import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard.jsx";
import { useBlogStore } from "../stores/useBlogStore";

const AllBlogsPage = () => {
  const { isFetchingBlogs, AllBlogs, getAllBlogs} = useBlogStore();

  useEffect(() => {
    getAllBlogs();
  }, []);

  if(isFetchingBlogs){
    return <h1>Fetching the Blogs, Please Wait for a moment...</h1>;
  }

  else if(AllBlogs.length === 0){
    return <h1>Currently No Blogs Available</h1>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {AllBlogs.map((eachblog) => (
        <BlogCard key={eachblog._id} blog={eachblog} />
      ))}
    </div>
  );
};

export default AllBlogsPage;
