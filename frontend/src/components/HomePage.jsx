import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ModelChk from "./ModelChk";
import Earth from "./Earth";

const blogs = [
  {
    id: 1,
    title: "Mastering JavaScript Closures",
    summary: "Closures are one of the most powerful features in JavaScript. Learn how to use them effectively.",
    image: "/blog-closure.jpg"
  },
  {
    id: 2,
    title: "React Hooks Demystified",
    summary: "A deep dive into React hooks and how they make functional components powerful.",
    image: "/blog-hooks.jpg"
  },
  {
    id: 3,
    title: "Asynchronous Programming in JS",
    summary: "Understand promises, async/await and how JS handles concurrency.",
    image: "/blog-async.jpg"
  },
];

const HomePage = () => {
  const navigate = useNavigate();

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
          <motion.button
            className="px-8 py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/tutorials")}
          >
            Start Learning
          </motion.button>
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
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-0 rounded-2xl shadow-2xl overflow-hidden"
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
                  src={blog.image || "/api/placeholder/400/250"} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 border-t border-gray-700">
                <h3 className="text-2xl font-bold mb-3 text-blue-300">{blog.title}</h3>
                <p className="text-gray-300 mb-4">{blog.summary}</p>
                <button 
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  Read More
                </button>
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
      <section className="h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 relative text-white">
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
            We are here. click on the globe.
          </motion.h1>
  
        </div>
      </section>

      {/* Footer - Enhanced with black background */}
      <footer className="bg-black text-gray-300 py-12 relative">
        <div className="max-w-6xl mx-auto px-6 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">MyApp</h3>
              <p className="text-sm">Your ultimate coding resource for learning and growth in the world of programming.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Tutorials</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Community</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Challenges</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Partners</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Subscribe</h4>
              <p className="text-sm">Get the latest updates and news</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-gray-800 rounded-l-lg focus:outline-none w-full"
                />
                <button className="bg-blue-600 px-4 rounded-r-lg hover:bg-blue-700 transition">
                  Go
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} MyApp | Built with 💻 by Jayant</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm mx-2 hover:text-blue-400 transition">Privacy Policy</a>
              <a href="#" className="text-sm mx-2 hover:text-blue-400 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;