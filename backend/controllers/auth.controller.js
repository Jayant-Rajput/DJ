import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";  
import ApiError from "../constants.js/ApiError.js";
import nodemailer from "nodemailer";
import dns from "dns";
import axios from "axios";
import { ratingsFetchKrDeBhai } from "../lib/utils.js";

export const isDisposableEmail = async (email) => {
  const domain = email.split('@')[1];
  const response = await axios.get(`https://open.kickbox.com/v1/disposable/${domain}`);
  return response.data.disposable;
}

export const checkMXRecords = async (email, callback) => {
  const domain = email.split('@')[1];
  dns.resolveMx(domain, (err, addresses) => {
    if(err || addresses.length===0){
      callback(false); // Invalid email Domain
    }else{
      callback(true); // valid email Domain
    }
  })
}

export const signup = async (req, res) => {
  const { fullname, email, password, branch, year, college, ccId, cfId, leetId } = req.body;

  try {

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const isDisposable = await isDisposableEmail(email);
    if (isDisposable) {
      return res.status(400).json({ message: "Fake email Id detected" });
    }

    const mxValid = await new Promise((resolve) => {
      checkMXRecords(email, (isValid) => {
        resolve(isValid);
      });
    });
    if (!mxValid) {
      return res.status(400).json({ message: "Invalid email domain" });
    }


    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedRatings = await ratingsFetchKrDeBhai(ccId, cfId, leetId);


    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      branch,
      year,
      college,
      codechefId: ccId,
      codeforcesId: cfId,
      leetcodeId: leetId,
      ...updatedRatings,
      authProvider: "local",
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).lean();  //.lean() converts user(a mongoose document) to a js object as i was destructuring it below and removing password field form it.

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    const { password : userPassword, ...userWithoutPassword } = user;    // password ka naam userPassword de diya, as it was creating problem as req.body se bhi password mil rha hai, so ye usse confuse kr rha tha.
    res.status(200).send(userWithoutPassword);

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshRating = async (req, res) => {
  try{
    const {objId, leetId, ccId, cfId} = req.body;

    const updatedData = await ratingsFetchKrDeBhai(ccId, cfId, leetId);

    await User.updateOne(
      {_id: objId},
      {$set : updatedData}
    );

    const updatedUser = await User.findById(objId).lean();

    if(updatedUser){
      res.status(201).json(updatedUser);
    }
    else{
      res.status(500).json({message: "bhai , user not found"});
    }

  }catch(error){
    console.log("Error in refreshRating controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {objId, fullname, college, year, ccId, cfId, leetId} = req.body;

    const ratingsUpdated = await ratingsFetchKrDeBhai(ccId, cfId, leetId);

    await User.updateOne(
      {_id: objId},
      {$set: {
        fullname,
        college,
        year,
        codechefId: ccId,
        codeforcesId: cfId,
        leetcodeId: leetId,
        ...ratingsUpdated
      }}
    )

    const updatedUser = await User.findById(objId).lean();

    if(updatedUser){
      res.status(201).json(updatedUser);
    }
    else{
      res.status(500).json({message: "bhai , user not found"});
    }

  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    // console.log("chechAuth function in backend: ", req.user);
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const oauthLoginUser = async(req,res) => {
  try {
    const {fullName, email, authProvider} = req.body

    if( [fullName, email, authProvider].some((field) => field?.trim()==="")) return res.status(404).json({message: "All fields are required"});

    const curr_user = await User.findOne({email: email});
    if(!curr_user) return res.status(404).json({message: "user doesn't exists"});
    
    generateToken(curr_user._id, res);
  
    const { password : userPassword, ...userWithoutPassword } = curr_user;    
    res.status(200).send(userWithoutPassword);

  } catch (error) {
    console.log("Error in oauthLoginUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const oauthUser = async (req, res) => {
  console.log("AMigo");
  console.log(req.body);
  try {
    const {fullname, email, authProvider, branch, college, year, ccId, cfId, leetId} = req.body
    if([fullname, email, authProvider, branch, college, year, ccId, cfId, leetId].some((field) => field?.trim()===""))
    { return res.status(404).json({message: "All fields are required"}); }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const password = "123456";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const updatedRatings = await ratingsFetchKrDeBhai(ccId, cfId, leetId);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      branch,
      year,
      college,
      codechefId: ccId,
      codeforcesId: cfId,
      leetcodeId: leetId,
      ...updatedRatings,
      authProvider
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in oauthUser controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const generateOTP = async (req, res) => {
  console.log("HOla");
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Please provide registered email address' });

    const matchedMail = User.findOne({email});
    if(!matchedMail) return res.status(400).json({ error: 'Please provide registered email address' });
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_USER,      
        pass: process.env.EMAIL_PASS  
        }
    });

    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

    let mailOptions = {
        from: process.env.EMAIL_RECEIVER,
        to: `<${email}>`, 
        subject: `New contact form submission from ${process.env.EMAIL_RECEIVER}`,
        text: `Hey user\n Welcome to HACC \n Your OTP is ${randomSixDigitNumber}`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.messageId);
        await User.findOneAndUpdate(
          { email: email }, 
          { $set: { otp: randomSixDigitNumber } }, 
          { $set: {authProvider: "otp"}},
        );
        res.json({ message: 'Your message has been sent successfully.' });
    }catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'There was an error sending your message.' });
    }
}

export const loginWithOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    console.log(OTP);
    console.log(email);
    if (!email || !OTP) {
      return res.status(400).json({ error: 'Please provide registered email address and OTP'});
    }
    const curr_user = await User.findOne({email}).lean();
    // console.log(curr_user.otp);
  
    if(!curr_user || String(curr_user.otp) !== String(OTP)){
      return res.status(400).json({message: "Invalid Credentials"});
    }
  
    generateToken(curr_user._id, res);
  
    const { password : userPassword, ...userWithoutPassword } = curr_user;    
    res.status(200).send(userWithoutPassword);

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

export const changePassword = async (req, res) => {
  try {
    const {email, oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword || !email){
      return res.status(400).json({ error: 'Please provide required credentials'});
    }
    
    const curr_user = await User.findOne({email: email});
    if(!curr_user){
      return res.status(400).json({message: "user doesn't exists"});
    }

    if(curr_user.password !== oldPassword){
      return res.status(400).json({message: "Incorrect Old Password"});
    }

    curr_user.password = newPassword;
    await curr_user.save({validateBeforeSave: false});

    return res.status(200).json({message: "Password changed successfully"});

  } catch (error) {
    console.log("Error in changing password", error.message);
  }
}




