import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'All Fields Required',
                success: false
            })
        }
        const checkUserExist = await User.findOne({ email });
        if (checkUserExist) {
            return res.status(400).json({
                message: 'Email Already Exists! Please Login',
                success: false
            })
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // create user 
        const user = await User.create({
            email,
            password: hashPassword
        })

        // return res
        return res.status(201).json({
            message: 'User Created Successfully',
            success: true,
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}