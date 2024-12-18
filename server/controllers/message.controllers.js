import Message from "../models/message.model.js";

export const getMessage = async (req, res) => {
    try {
        const user1 = req.id;
        const user2 = req.body.id;

        if (!user1 || !user2) {
            return res.status(400).json({
                message: "Invalid user id",
                status: false
            })
        }

        const message = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ timestamp: 1 })

        return res.status(200).json({
            message: "Messages retrieved successfully",
            message
        })
    } catch (error) {
        console.log(error)
    }
}