import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    role: { type: String, required: false, default: "user" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    contactNumber: { type: Number, required: false },
    profilePicture: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    googleId: { type: String, required: false, },
    facebookId: { type: String, required: false, },
    dateCreated: { type: Date, default: Date.now },
    fitnessGoals: { type: String, required: false, default: "Not specified", },
});

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;



