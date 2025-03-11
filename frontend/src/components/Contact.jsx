import { useState } from "react";
import { motion } from "framer-motion";
import { axiosInstance } from "../lib/axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
  
    try {
      const response = await axiosInstance.post(
        "/contact/team",
        formData, 
      );
  
      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-8 bg-white text-gray-900 shadow-2xl rounded-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-all"
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
}
