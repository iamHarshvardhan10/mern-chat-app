import mongoose from "mongoose";
import Channel from "../models/Channel.model.js";
import User from "../models/user.model.js";

export const createChannel = async (req, res) => {
    try {
        const { name, members } = req.body;
        const userId = req.id;
        const admin = await User.findById(userId);

        if (!admin) {
            return res.status(400).json({
                message: "User not found",

            })
        }

        const validMembers = await User.find({ _id: { $in: members } });

        if (validMembers.length !== members.length) {
            return res.status(400).json({
                message: "Invalid members",

            })
        }

        const newChannel = new Channel({
            name,
            members,
            admin: userId
        })

        await newChannel.save();
        return res.status(200).json({
            Channel: newChannel
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating channel',
            error: error.message
        })
    }
}



export const getUserChannels = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.id);
        const channels = await Channel.find({
            $or: [
                { admin: userId },
                { members: userId }
            ]
        }).sort({ updatedAt: -1 })

        return res.status(200).json({
            channels
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error fetching user channels',
        })
    }
}



export const getChannelMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const channel = await Channel.findById(channelId).populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: "firstName lastName email _id image color"
            }
        });

        if (!channel) {
            return res.status(404).json({
                message: 'Channel Not Found'
            })
        }

        const messages = channel.messages;
        return res.status(200).json({
            messages
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: 'Error fetching channel messages',
        })
    }
}