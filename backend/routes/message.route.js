import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", protectRoute, getMessages);
router.post("/send", protectRoute ,sendMessage);

export default router;