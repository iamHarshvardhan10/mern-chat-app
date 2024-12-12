import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    image: {
        type: String,
    },
    color: {
        type: Number
    },
    profileSetup: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
export default User;