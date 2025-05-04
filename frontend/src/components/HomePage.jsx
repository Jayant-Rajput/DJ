import React, {useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModelChk from "./ModelChk";
import Earth from "./Earth";
import { useChatStore } from '../stores/useChatStore';
import { useBlogStore } from "../stores/useBlogStore";
import CardSkeleton from "../skeleton-screen/CardSkeleton.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const {messages, subscribeToMessage, unsubscribeToMessage} = useChatStore();

  const { isFetchingBlogs, AllBlogs, getAllBlogs, getBlog} = useBlogStore();
  
  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeToMessage();
  }, [messages]);

  const blogs = AllBlogs.slice(0, 3);

  return (
    <div className="relative w-full">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/bgvideo2.mp4" type="video/mp4" />
      </video>

      {/* Section 1 - Coding Quotes + Desktop Model - Enhanced */}
      <section className="h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 relative text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 z-[-1]"></div>
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Coding is Poetry
          </motion.h1>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl italic bg-black/30 p-4 rounded-lg border-l-4 border-blue-400">
              "First, solve the problem. Then, write the code." – John Johnson
            </p>
            <p className="text-xl md:text-2xl italic bg-black/30 p-4 rounded-lg border-l-4 border-purple-400">
              "Programs must be written for people to read, and only incidentally for machines to execute." – Harold Abelson
            </p>
          </motion.div>
        </div>
        <div
          className="md:w-1/2 mt-10 md:mt-0"
        >
         <div>
          <h1 className="text-5xl md:text-6xl font-bold">Hello</h1>
         </div>
         <div className="mt-50">
         </div>
          <ModelChk />
        </div>
      </section>

      {/* Section 2 - Latest Blogs - Enhanced */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-16 py-20 relative text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-blue-900/40 z-[-1]"></div>
        <motion.h2 
          className="text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Latest Blogs</span>
        </motion.h2>
        <div className={`${isFetchingBlogs ? "w-full" : "grid md:grid-cols-3 gap-10 w-full mx-auto"}`}>
          {
            isFetchingBlogs ?  <CardSkeleton /> :
          blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-0 rounded-2xl shadow-2xl overflow-hidden ml-10"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)" 
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={blog.coverImage || "/api/placeholder/400/250"} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 border-t border-gray-700">
                <h3 className="text-2xl font-bold mb-3 text-blue-300">{blog.title}</h3>
                <p className="text-gray-300 mb-4">{blog.summary}</p>
                <Link to={`/blogs/${blog._id}`} className="text-sm font-semibold px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          onClick={() => navigate("/blogs")}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Explore All Blogs
        </motion.button>
      </section>

      {/* Section 3 - About Us */}
      <section className="h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-blue-900/40 z-[-1]"></div>
        <motion.h2 
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>
        <motion.p 
          className="max-w-3xl text-lg leading-relaxed bg-black/30 p-8 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to our coding community! We are passionate about sharing knowledge and building innovative solutions. Whether youre just starting out or a seasoned developer, our platform provides insightful blogs, engaging contests, and a space to collaborate and grow.
        </motion.p>
      </section>

      {/* section 4 Earth model and fancy line */}
      <section className="h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 relative text-white -mt-70">
      <div className="absolute inset-0 bg-black/70 z-[-1]"></div>
        <div
          className="md:w-1/2 mt-10 md:mt-0"
        >
         <div>
          <h1 className="text-5xl md:text-6xl font-bold"></h1>
         </div>
         <div className="mt-10">
         </div>
          <Earth />
        </div>
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            We are here.
          </motion.h1>
  
        </div>
      </section>
    </div>
  );
};

export default HomePage;