import TrainerModel from "../models/Trainers.js";
import { createResponse, passwordHash } from "../utils/utilityFunctions.js";

export const trainerCount = async () => {
    const count = TrainerModel.countDocuments();
    return await count;
}


export const getTrainers = async (page, pageSize) => {
    const skip = (page - 1) * pageSize;
    const trainers = await TrainerModel.find().skip(skip).limit(pageSize);
    const totalTrainers = await TrainerModel.countDocuments();
    const totalPages = Math.ceil(totalTrainers / pageSize);
    return {
        trainers,
        totalPages,
    };
};

export const getTrainersName = async () => {
    return await TrainerModel.find({}, 'firstName lastName');
}

export const createTrainer = async (trainerData) => {
    const isEmailExists = await getTrainerByEmail(trainerData.email);
    if (isEmailExists) {
        return createResponse(400, "Email Exist", null)
    }
    else {
        try {
            const hashedPassword = await passwordHash(trainerData.password);
            trainerData.password = hashedPassword;
            console.log(trainerData);
            const newTrainer = await TrainerModel.create(trainerData);
            console.log("Trainer hashedPassword: ", hashedPassword);

            if (newTrainer) {
                return createResponse(201, "Trainer Created", null)
            }
            else {
                return createResponse(400, "Unable to create Trainer", null)
            }
        } catch (error) {
            return createResponse(400, "DB error", null)
        }
    }
}


export const updateTrainer = async (req) => {
    const isTrainerExists = await getTrainerById(req._id);
    if (!isTrainerExists) {
        return createResponse(404, "Trainer Does not Exist", null);
    }

    try {
        const updateData = {
            firstName: req.firstName,
            lastName: req.lastName,
            email: req.email,
            contactNumber: req.contactNumber,
            bio: req.bio,
            age: req.age,
            gender: req.gender,
            address: req.address,
            state: req.state,
            instaId: req.instaId,
            facebook: req.facebook,
            twitter: req.twitter,
            totalClients: req.totalClients,
        };

        if (req.password) {
            const hashedPassword = await passwordHash(req.password);
            updateData.password = hashedPassword;
        }

        // Update profile picture if it was provided
        if (req.profilePicture) {
            updateData.profilePicture = req.profilePicture;
        }

        const trainer = await TrainerModel.findByIdAndUpdate(
            { _id: req._id },
            updateData,
            { new: true } // Return the updated document
        );

        if (trainer) {
            return createResponse(200, "Trainer Updated Successfully", trainer);
        } else {
            return createResponse(400, "Trainer Not Updated", null);
        }
    } catch (error) {
        console.error("Update error:", error);
        return createResponse(500, error.message || "DB Error", null);
    }
}


export const deleteTrainer = async (id) => {
    const isTrainerExists = await getTrainerById(id);
    if (!isTrainerExists) {
        return createResponse(404, "Trainer not Found", null);
    } else {
        try {
            const trainer = await TrainerModel.deleteOne({ _id: id });
            if (trainer.deletedCount === 1) return createResponse(200, "Trainer Deleted", null);
            else return createResponse(404, "Trainer Not Deleted", null)
        } catch (error) {
            throw new Error(error.message || "DB error");

        }
    }
}


export const getTrainerById = async (id) => {
    const trainerExists = await TrainerModel.find({ _id: id });
    return trainerExists ? true : false;
}


export const getTrainerByEmail = async (email) => {
    const trainer = await TrainerModel.find({ email })
    return trainer.length > 0 ? true : false;
}