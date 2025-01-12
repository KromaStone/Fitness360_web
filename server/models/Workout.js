import mongoose from "mongoose";
const WorkoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    imagePath: { type: String, required: false },
    videoPath: { type: String, required: false },
    price: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    category: { type: String, required: true }
});
const WorkoutModel = mongoose.model('workouts', WorkoutSchema);
export default WorkoutModel;