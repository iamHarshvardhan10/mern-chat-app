import User from "../models/user.model.js";

export const searchContacts = async (req, res) => {
    try {
        const { searchTerm } = req.body;

        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).json({ message: "Search term is required" });
        }

        const sanitizedSearchTerm = searchTerm.replace()

        const regex = new RegExp(sanitizedSearchTerm, "i");
        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.id } },
                {
                    $or: [{ firstName: regex }, { lastName: regex }, { email: regex }]
                }
            ]
        });

        return res.status(200).json({ contacts })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error searching contacts",
            error: error.message

        })
    }
}