import { createProductMulterConfig, createTrainerMulterConfig, createWorkoutMulterConfig } from "../multerConfig/MulterConfig.js";

const workOutBF = "uploads/trainer-workout";
const productBF = "uploads/productImgs";
const trainerBF = "uploads/trainerImgs";

export const workoutUpload = createWorkoutMulterConfig(
    workOutBF,  // Base folder
    [".mp4", ".mkv", ".jpg", ".jpeg", ".png"], // Allowed extensions
    50 // Max file size in MB
);

export const productUpload = createProductMulterConfig(
    productBF,
    ['.jpg', '.jpeg', '.png', '.webp'],
    20
);

export const trainerUpload = createTrainerMulterConfig(
    trainerBF,
    ['.jpg', '.jpeg', '.png', '.webp'],
    5
);
