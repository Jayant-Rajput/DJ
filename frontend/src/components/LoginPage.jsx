import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useFirebase } from "../context Api/Firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Signin = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  const [genOtpForm, setgenOtpForm] = useState(false);
  const [otp, setOtp] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    OTP: "",
  });

  const { login, isLoggingIn, oAuthLogin, loginWithOTP, generateOTP,isSendingOtp } = useAuthStore();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await login(formData);
    navigate("/");
  }

  const handleOTP = async(e) => {
    e.preventDefault();
    console.log(formData.OTP);
    await loginWithOTP(formData);
    navigate("/");
  }

  const genOTP = async(e) => {
    e.preventDefault();
    await generateOTP(formData);
    setOtp(true);
  }

  const handleForgotPassword = async () => {
    await forgotPassword();
  }

  useEffect(()=>{
    onAuthStateChanged(firebase.firebaseAuth, (user) => {
        if(user){
            setUser(user);
        }else{
            setUser(null);
        }
    })
  },[onAuthStateChanged])

  // const firebaseAuthentication = async (user) => {
  //   const response = await fetch("http://localhost:5001/api/auth/oauthlogin", {
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
      oAuthLogin(user, navigate);
      // firebaseAuthentication(user);
    }
  }, [user, navigate]);

  if(isLoggingIn){
    return <h1>Loggin In...</h1>
  }
  if(isSendingOtp){
    return <h1>Ruk ja bhai tereko ek mail bhejta hu</h1>
  }

  return !genOtpForm ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email ID */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Id
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
  
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password Section */}
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
  
        {/* Social Login Buttons */}
        <div className="mt-4 space-y-3">
          <button
            onClick={() => firebase.signInWithGoogle()}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
  
          <button
            onClick={() => setgenOtpForm(true)}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
          >
            Sign in with OTP
          </button>
  
          <button
            onClick={() => firebase.signInWithGithub()}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
          >
            <FaGithub className="mr-2" /> Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Enter Details
        </h2>
  
        <form onSubmit={genOTP} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
  
          {/* Submit OTP Request */}
          {!otp && <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get OTP
          </button>}
        </form>
  
        {/* OTP Verification Form */}
        {otp && (
          <form onSubmit={handleOTP} className="space-y-4 mt-4">
            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="OTP"
                value={formData.OTP}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
  
            {/* Verify OTP Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        )}
  
        {/* Go back to Sign In */}
        <button
          onClick={() => setgenOtpForm(false)}
          className="mt-4 w-full text-sm text-blue-600 hover:underline"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
  
  
};

export default Signin;
