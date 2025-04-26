import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema({
    role: {
        type: String, required: false, default: "trainer",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    profilePicture: { type: String, required: false },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    // servicesOffered: { type: String, required: true },
    bio: { type: String, required: true },
    totalClients: { type: String, required: false },
    instaId: { type: String, required: true },
    facebook: { type: String, required: true },
    twitter: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
})

const TrainerModel = mongoose.model('trainers', TrainerSchema);
export default TrainerModel;