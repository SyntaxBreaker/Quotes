import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    createdBy: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('quote', quoteSchema);