import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { useBlogStore } from "../stores/useBlogStore";
import { useChatStore } from "../stores/useChatStore";
import BlogDetailSkeleton from "../skeleton-screen/BlogDetailSkeleton.jsx";

const BlogDetails = () => {
  const { messages, subscribeToMessage, unsubscribeToMessage } = useChatStore();

  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeToMessage();
  }, [messages]);

  const { blogid } = useParams();
  const { getBlog, isFetchingBlog, currentBlog } = useBlogStore();

  useEffect(() => {
    getBlog(blogid);
  }, [blogid]);

  if (isFetchingBlog || !currentBlog) {
    return <BlogDetailSkeleton />;
  }

  return (
    <div className="relative w-full">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1] blur-xl"
      >
        <source src="/bgvideo2.mp4" type="video/mp4" />
      </video>

      <div className="max-w-fit w-full p-4 mt-20 text-left ml-20">
        <img
          src={
            currentBlog.coverImage !== "null"
              ? currentBlog.coverImage
              : "/avatar.png"
          }
          alt="Cover"
          className="max-w-2xl w-full h-84 object-cover rounded-md"
        />

        <h1 className="text-3xl font-bold mt-12">{currentBlog.title}</h1>
        <p className="text-gray-500 font-bold mt-1">
          By {currentBlog.createdBy?.fullname || "Unknown"}
        </p>

        <div className="prose prose-lg prose-slate text-xl max-w-none mt-5">
          {parse(currentBlog.content)}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
