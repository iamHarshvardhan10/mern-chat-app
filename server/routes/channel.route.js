import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/channel.controllers.js";


const router = express.Router();

router.post("/createChannel", verifyUser, createChannel)
router.get('/getUserChannels', verifyUser, getUserChannels)
router.get('/getChannelMessage/:channelId', verifyUser, getChannelMessages)
export default router;