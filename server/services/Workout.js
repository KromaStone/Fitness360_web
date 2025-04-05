import e from "cors";
import WorkoutModel from "../models/Workout.js";
import { createResponse } from "../utils/utilityFunctions.js";
import UserModel from "../models/User.js";
import fs from "fs";
import path from "path";

export const createWorkout = async (workoutData) => {
    try {
        const newWorkout = await WorkoutModel.create(workoutData);
        if (newWorkout) {
            return createResponse(200, "Workout created successfully", null);
        } else {
            return createResponse(203, "Unable to create workout", null);
        }
    } catch (error) {
        console.error("Error in createWorkout:", error);
        return createResponse(500, error.message);
    }
};

export const getWorkouts = async (page, pageSize, trainerId) => {
    const skip = (page - 1) * pageSize;
    let workoutData;
    if (trainerId && trainerId.length > 0) {
        workoutData = await WorkoutModel.find({ trainerId: trainerId })
            .skip(skip)
            .limit(pageSize);
    } else {
        workoutData = await WorkoutModel.find({})
            .skip(skip)
            .limit(pageSize);
    }
    const totalWorkout = trainerId && trainerId.length > 0
        ? await WorkoutModel.countDocuments({ trainerId: trainerId })
        : await WorkoutModel.countDocuments();

    const totalPages = Math.ceil(totalWorkout / pageSize);

    if (workoutData) {
        return {
            workoutData,
            totalPages
        };
    } else {
        return createResponse(404, "No workout data", null);
    }
};

export const getWorkoutsByCategory = async (page, pageSize, category) => {
    const skip = (page - 1) * pageSize;

    let workoutData;
    if (category && category.length > 0) {
        workoutData = await WorkoutModel.find({ category: category })
            .select('imagePath price title category')
            .skip(skip)
            .limit(pageSize);
    } else {
        workoutData = await WorkoutModel.find({})
            .select('imagePath price title category')
            .skip(skip)
            .limit(pageSize);
    }
    const totalWorkout = category && category.length > 0
        ? await WorkoutModel.countDocuments({ category: category })
        : await WorkoutModel.countDocuments();

    const totalPages = Math.ceil(totalWorkout / pageSize);

    if (workoutData) {
        return {
            workoutData,
            totalPages
        };
    } else {
        return createResponse(404, "No workout data", null);
    }
};

export const getWorkoutCount = async () => {
    const count = WorkoutModel.countDocuments();
    return count;
}

// export const getWorkoutbyTrainerId = async (trainerId) => {
//     const workoutData = await WorkoutModel.find({ trainerId });
//     if (workoutData) {
//         return createResponse(200, "workout Data", workoutData);
//     } else {
//         return createResponse(201, "No workout Data", null);
//     }
// }

// export const deleteWorkout = async (id) => {
//     const isWorkoutExists = await WorkoutModel.findById(id);
//     if (!isWorkoutExists) {
//         return createResponse(204, "Workout does not exist", null);
//     } else {
//         try {
//             const workout = await WorkoutModel.deleteOne({ _id: id });
//             if (workout.deletedCount === 1) return createResponse(200, "Workout Deleted", null);
//             else return createResponse(404, "Workout not deleted", null);
//         } catch (error) {
//             throw new Error(error.message || "DB error");
//         }
//     }
// }


export const deleteWorkout = async (id) => {
    try {
        const workout = await WorkoutModel.findById(id);
        if (!workout) {
            return createResponse(204, "Workout does not exist", null);
        }
        if (workout.imagePath) {
            deleteFile(workout.imagePath); //image 
        }
        if (workout.videoPath) {
            deleteFile(workout.videoPath); // video
        }
        const result = await WorkoutModel.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return createResponse(200, "Workout Deleted", null);
        } else {
            return createResponse(404, "Failed to delete workout", null);
        }
    } catch (error) {
        console.error("Error deleting workout:", error.message);
        throw new Error(error.message || "Server Error");
    }
};

export const deleteFile = (fileUrl) => {
    try {
        if (!fileUrl) {
            console.warn("File URL is empty or undefined.");
            return;
        }
        if (!fileUrl.startsWith(process.env.BASE_URL_MEDIA)) {
            console.warn(`File URL does not match the BASE_URL_MEDIA: ${fileUrl}`);
            return;
        }
        if (!process.env.UPLOADS_DIR) {
            console.error("UPLOADS_DIR is not defined in the environment variables.");
            return;
        }
        const relativePath = fileUrl.replace(process.env.BASE_URL_MEDIA, "");
        const filePath = path.join(process.env.UPLOADS_DIR, relativePath);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${filePath}:`, err.message);
                } else {
                    console.log(`File successfully deleted: ${filePath}`);
                }
            });
        } else {
            console.warn(`File does not exist at path: ${filePath}`);
        }
    } catch (error) {
        console.error(`Failed to resolve or delete file: ${fileUrl}`, error.message);
    }
};

