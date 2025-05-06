import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer"
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModelChk from "./ModelChk";
import Earth from "./Earth";
import { useChatStore } from "../stores/useChatStore";
import { useBlogStore } from "../stores/useBlogStore";
import CardSkeleton from "../skeleton-screen/CardSkeleton.jsx";
import { useAuthStore } from "../stores/useAuthStore.js";
import AnimatedCount from "./AnimatedCount.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const { totalUsers, authUser } = useAuthStore();
  const { messages, subscribeToMessage, unsubscribeToMessage } = useChatStore();
  const { isFetchingBlogs, AllBlogs, getAllBlogs, getBlog } = useBlogStore();

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
              "Programs must be written for people to read, and only
              incidentally for machines to execute." – Harold Abelson
            </p>
            <p className="text-xl md:text-2xl italic bg-black/30 p-4 rounded-lg border-l-4 border-purple-400">
              "Confusion is part of programming." – Felienne Hermans
            </p>
          </motion.div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold">Hello</h1>
          </div>
          <div className="mt-50"></div>
          <ModelChk />
        </div>
      </section>

      {/* Section 2 - Latest Blogs - Enhanced */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-16 py-20 relative text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-blue-500/20 z-[-1]"></div>
        <motion.h3
          className="text-8xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Now we are family of
          <AnimatedCount totalUsers={totalUsers} />
        </motion.h3>
        <motion.p
          className="text-7xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          developers and growing every day!
        </motion.p>
      </section>

      {/* Section 3 - About Us */}
      <section className="min-h-screen flex flex-col items-center px-6 md:px-20 text-center relative text-white">
  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-900/20 z-[-1]"></div>

  {/* Using useInView hook for scroll-triggered animations */}
  {(() => {
    // Import at the top of your file: import { useInView } from 'react-intersection-observer';
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2
    });
    
    return (
      <div ref={ref} className="w-full">
        <motion.h2
          className="text-6xl mt-10 font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          HACC - Hacc Ain't a Coding Club
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
          {/* Left side: Paragraph */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-black/30 p-8 rounded-xl h-full">
              <p className="text-left text-2xl leading-relaxed">
                Welcome to our coding community! We are passionate about sharing
                knowledge and building innovative solutions. Whether you're just
                starting out or a seasoned developer, our platform provides
                insightful blogs, engaging contests, and a space to collaborate and
                grow.
              </p>
            </div>
          </motion.div>
          
          {/* Right side: Points */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-black/30 p-8 rounded-xl h-full">
              <motion.h3 
                className="text-3xl font-semibold mb-4 text-left text-blue-300"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                Whats Here For You:
              </motion.h3>
              <ul className="text-left space-y-3">
                {[
                  "Learn from the experiences of peers and seniors through blogs",
                  "Chat and discuss with like-minded developers",
                  "Analyse your performance through detailed analytics",
                  "Get timely contest notifications",
                  "Share your knowledge and experiences with others"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex text-xl items-start"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.5 + (index * 0.2), duration: 0.3 }}
                  >
                    <span className="inline-block mr-2 text-purple-400">{index + 1}.</span> 
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    );
  })()}
</section>

{/* Section 2 - Latest Blogs - Enhanced */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-16 py-20 relative text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black-900/10 z-[-1]"></div>
        <motion.h2
          className="text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Latest Blogs
          </span>
        </motion.h2>
          
        <div
          className={`${
            isFetchingBlogs
              ? "w-full"
              : "grid md:grid-cols-3 gap-10 w-full mx-auto"
          }`}
        >
          {isFetchingBlogs ? (
            <CardSkeleton />
          ) : (
            blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-0 rounded-2xl shadow-2xl overflow-hidden ml-10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
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
                  <h3 className="text-2xl font-bold mb-3 text-blue-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{blog.summary}</p>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-sm font-semibold px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))
          )}
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

      {/* section 4 Earth model and fancy line */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 relative text-white -mt-70">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-bg-black/70 z-[-1]"></div>
        <div className="md:w-1/2 mt-0">

          <div className="mt-50"></div>
          <Earth />
        </div>
        <div className="md:w-1/2 text-center mt-50 md:text-left space-y-6">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            We are here.
          </motion.h1>
          {!authUser && (
            <motion.p
              className="text-3xl text-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-900 font-bold cursor-pointer underline"
              >
                Signup
              </span>{" "}
              now to join our community and to track your progress across top
              coding platforms. Discuss problems with peers and get access of
              precious Blogs
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
