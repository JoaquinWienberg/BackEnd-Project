import mongoose from "mongoose";

export default mongoose.model('Users', {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    phone: Number,
    photo: String
});
