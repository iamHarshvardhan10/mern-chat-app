import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createChannel, getUserChannels } from "../controllers/channel.controllers.js";


const router = express.Router();

router.post("/createChannel", verifyUser, createChannel)
router.get('/getUserChannels', verifyUser, getUserChannels)

export default router;