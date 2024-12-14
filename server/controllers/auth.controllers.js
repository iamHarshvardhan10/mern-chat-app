import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'All Fileds Required',
                success: false
            })
        }
        // check user 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User Not Found , Please SignUp To Proceed',
                success: false
            })
        }

        // compare password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(404).json({
                message: 'Password is Invalid',
                success: false
            })
        }

        // generate token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '24h' });

        const options = {
            expiresIn: '24h',
            httpOnly: true,
            sameSite: 'None',
            secure: true
        }

        return res.cookie("token", token, options).status(200).json({
            message: "Login Successfully",
            success: true,
            user
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}


export const getUserInfo = async (req, res) => {
    try {
        // console.log(req.id);
        const userData = await User.findById(req.id);
        if (!userData) {
            return res.status(404).json({
                message: 'User Not Found',
                success: false
            })
        }

        return res.status(200).json({
            message: 'User Info',
            success: true,
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color

        })

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}


// update profile
export const updateprofile = async (req, res) => {
    try {
        const { id } = req;
        const { firstName, lastName, color } = req.body;
        if (!firstName || !lastName) {
            return res.status(400).json({
                message: 'Please fill all fields',
                success: false
            })
        }

        const userData = await User.findByIdAndUpdate(id, {
            firstName, lastName, color, profileSetup: true
        }, { new: true, runValidators: true })

        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}