import express from "express";
import { checkAuth, login, logout, signup, updateProfile, oauthUser, oauthLoginUser, generateOTP, loginWithOTP, changePassword, refreshRating } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
router.post("/oauthlogin", oauthLoginUser);
router.post("/oauthuser", oauthUser);
router.post("/gen-OTP", generateOTP);
router.post("/login-OTP", loginWithOTP);
router.post("/change-password", changePassword);
router.post("/refreshRatings", refreshRating );
router.put("/updateProfile", updateProfile);


export default router;