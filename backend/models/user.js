import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: false
    }
}, {timestamps: true});

export default mongoose.model('user', userSchema);