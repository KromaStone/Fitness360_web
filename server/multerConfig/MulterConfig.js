import multer from "multer";
import fs from "fs";
import path from "path";

export const createMulterStorage = (folderBase) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const trainerId = req.body.trainerId;
            if (!trainerId) {
                return cb(new Error("Trainer ID is required in the request body."));
            }

            const folderPath = `${folderBase}/${trainerId}/`;
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            const workoutTitle = req.body.title?.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
            if (!workoutTitle) {
                return cb(new Error("Workout title is required in the request body."));
            }

            const fileExt = path.extname(file.originalname);
            const fileName = `${workoutTitle}${fileExt}`;
            cb(null, fileName);
        },
    });
};

export const createWorkoutMulterConfig = (folderBase, allowedExtensions, maxFileSizeMB) => {
    return multer({
        storage: createMulterStorage(folderBase),
        fileFilter: (req, file, cb) => {
            const fileExt = path.extname(file.originalname).toLowerCase();
            if (allowedExtensions.includes(fileExt)) {
                cb(null, true);
            } else {
                cb(new Error(`Unsupported file type: ${fileExt}`));
            }
        },
        limits: { fileSize: maxFileSizeMB * 1024 * 1024 },
    });
};

export const createProductMulterConfig = (baseFolder, allowedExtensions, maxFileSizeMB) => {

    const fileCounts = new Map();

    return multer({
        storage: multer.diskStorage({
            destination: async (req, file, cb) => {
                try {
                    const productName = req.body.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                    const productFolder = `${baseFolder}/${productName}`;
                    await createDirectoryIfNotExists(productFolder);

                    if (!fileCounts.has(productName)) {
                        fileCounts.set(productName, 0);
                    }

                    cb(null, productFolder);
                } catch (error) {
                    cb(error);
                }
            },
            filename: (req, file, cb) => {
                const productName = req.body.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                const currentCount = fileCounts.get(productName) + 1;
                fileCounts.set(productName, currentCount);

                const filename = `${productName}${currentCount}${path.extname(file.originalname)}`;
                cb(null, filename);
            }
        }),
        fileFilter: (req, file, cb) => {
            const fileExt = path.extname(file.originalname).toLowerCase();
            if (allowedExtensions.includes(fileExt)) {
                cb(null, true);
            } else {
                cb(new Error(`Unsupported file type: ${fileExt}`));
            }
        },
        limits: { fileSize: maxFileSizeMB * 1024 * 1024 },
    });
};

export const createDirectoryIfNotExists = async (dirPath) => {
    try {
        await fs.promises.mkdir(dirPath, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to create directory: ${error.message}`);
    }
};


export const createTrainerMulterConfig = (baseFolder, allowedExtensions, maxFileSizeMB) => {
    return multer({
        storage: multer.diskStorage({
            destination: async (req, file, cb) => {
                try {
                    const trainerName = req.body.firstName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                    const trainerFolder = `${baseFolder}/${trainerName}`;
                    await createDirectoryIfNotExists(trainerFolder);
                    cb(null, trainerFolder);
                } catch (error) {
                    cb(error);
                }
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
                cb(null, filename);
            }
        }),
        fileFilter: (req, file, cb) => {
            const fileExt = path.extname(file.originalname).toLowerCase();
            if (allowedExtensions.includes(fileExt)) {
                cb(null, true);
            } else {
                cb(new Error(`Unsupported file type: ${fileExt}`));
            }
        },
        limits: { fileSize: maxFileSizeMB * 1024 * 1024 },
    });
}