import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createChannel } from "../controllers/channel.controllers.js";


const router = express.Router();

router.post("/createChannel", verifyUser, createChannel)


export default router;