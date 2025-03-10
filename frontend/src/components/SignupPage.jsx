import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useFirebase } from "../context Api/Firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";

import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    fullname:"",email:"",password:"",branch:"",year:"",college:"",
    ccId:"",cfId:"",leetId:""
  })

  const { signup, isSigninUp , oauthData} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData, [name]:value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const success = validateForm();
    
    if(!success) return;

    await signup(formData);
    // navigate('/');
  }


  useEffect(()=>{
    onAuthStateChanged(firebase.firebaseAuth, (user) => {
        if(user){
            setUser(user);
        }else{{
            setUser(null);
        }}
    })
  },[onAuthStateChanged])

  // const firebaseAuthentication = async (user) => {
  //   const response = await fetch("http://localhost:5001/api/auth/oauth", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         fullName: user.displayName,
  //         email : user.email,
  //         accessToken: user.accessToken,
  //         authProvider: "google"
  //       })
  //   })

  //   if(response.ok){
  //     localStorage.setItem("profile", user.displayName);
  //     localStorage.setItem("token", user.accessToken);
  //     localStorage.setItem("userEmail", user.email);
  //     navigate("/");
  //   }
  // }

  // console.log(user);

  useEffect(() => {
    if (user) {
      console.log("nav");
      oauthData(user); 
      navigate("/oauth-form");
      console.log("nav-baad");
      // firebaseAuthentication(user);
    }
  }, [user, navigate]);


  if (isSigninUp) {
    return <h1>Signing up...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname" value={formData.fullname} onChange={handleChange}
                placeholder="Enter your full name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"  value={formData.email} onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"  value={formData.password} onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Branch
              </label>
              <select
                id="branch"
                name="branch"  value={formData.branch} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select Branch
                </option>
                <option value="1">ECE</option>
                <option value="2">IT</option>
                <option value="3">CSE</option>
                <option value="4">EE</option>
                <option value="5">MECH</option>
                <option value="6">CIVIL</option>
                <option value="7">META</option>
                <option value="8">MINING</option>
                <option value="9">BIOTECH</option>
                <option value="10">BME</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <select
                id="year"
                name="year"  value={formData.year} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select Year
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="college"
                className="block text-sm font-medium text-gray-700"
              >
                College
              </label>
              <input
                type="text"
                id="college"
                name="college"  value={formData.college} onChange={handleChange}
                placeholder="Enter your College Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* CodeChef Username */}
            <div>
              <label
                htmlFor="ccId"
                className="block text-sm font-medium text-gray-700"
              >
                CodeChef Username
              </label>
              <input
                type="text"
                id="ccId"
                name="ccId"  value={formData.ccId} onChange={handleChange}
                placeholder="Enter your codechef username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* CodeForces Username */}
            <div>
              <label
                htmlFor="cfId"
                className="block text-sm font-medium text-gray-700"
              >
                CodeForces Username
              </label>
              <input
                type="tel"
                id="cfId"
                name="cfId"  value={formData.cfId} onChange={handleChange}
                placeholder="Enter your codeforces username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Leetcode Username */}
            <div>
              <label
                htmlFor="leetId"
                className="block text-sm font-medium text-gray-700"
              >
                Leetcode Username
              </label>
              <input
                type="text"
                id="leetId"
                name="leetId"  value={formData.leetId} onChange={handleChange}
                placeholder="Enter your leetcode username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center border-l pl-4">
          <h3 className="text-xl font-semibold mb-4">Or Sign Up With</h3>
          <button
            onClick={()=>{
              firebase.signInWithGoogle()
            }}
            className="w-full py-2 px-4 mb-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Sign Up with Google
          </button>
          <button
            onClick={()=>{
              firebase.signInWithGithub()
            }}
            className="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Sign Up with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
