import React from 'react';
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Company Info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">HACC</h3>
            <p className="text-gray-400 mb-6">CP platform for college Students</p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Blogs</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-400 mr-3" />
                <span className="text-gray-400">NIT Raipur, Chhattisgarh, India</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-3" />
                <a href="mailto:info@company.com" className="text-gray-400 hover:text-white transition-colors">ps25082005@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} HACC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;