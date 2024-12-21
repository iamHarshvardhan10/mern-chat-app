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