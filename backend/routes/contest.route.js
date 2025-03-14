import express from "express";
import { contestList } from "../controllers/contest.controller.js";

const router = express.Router();

router.get("/list", contestList);

export default router;