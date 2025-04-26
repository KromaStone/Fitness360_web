import TrainerModel from "../models/Trainers.js";
import { createTrainer, deleteTrainer, getTrainers, getTrainersName, trainerCount, updateTrainer } from "../services/TrainerService.js";
import { validatePagination } from "../utils/utilityFunctions.js";


export const TrainerCount = async (req, res) => {
    try {
        const totalTrainer = await trainerCount();
        res.status(200).send({ totalTrainer })
    } catch (error) {
        res.status(404).send({
            error: e?.message
        });
    }
}

// export const GetTrainers = async (req, res) => {
//     try {
//         const trainerData = await getTrainers();
//         res.status(200).send({ trainerData });
//     } catch (e) {
//         res.status(404).send({
//             error: e?.message
//         });
//     }
// }

export const GetTrainers = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const { validatedPage, validatedPageSize } = validatePagination(page, pageSize);

        const trainerData = await getTrainers(validatedPage, validatedPageSize);
        res.status(200).send(trainerData);
    } catch (e) {
        res.status(404).send({
            error: e?.message,
        });
    }
};
export const GetTrainersName = async (req, res) => {
    try {
        const trainerData = await getTrainersName();
        res.status(200).send({ trainerData });
    } catch (e) {
        res.status(404).send({
            error: e?.message,
        });
    }
}


// export const CreateTrainer = async (req, res) => {
//     try {
//         const trainerData = await createTrainer(req.body);
//         return res.status(trainerData.statusCode).send(trainerData)
//     } catch (e) {
//         return res.status(500).send({
//             error: e?.message || "Internal Server Erro"
//         })
//     }
// }
export const CreateTrainer = async (req, res) => {
    try {
        const trainerData = req.body;
        const imageBaseUrl = process.env.BASE_URL_MEDIA || '';

        if (req.file) {
            trainerData.profilePicture = `${imageBaseUrl}/${req.file.path.replace(/\\/g, "/")}`;
        }

        const trainerResponse = await createTrainer(trainerData);
        return res.status(trainerResponse.statusCode).send(trainerResponse);
    } catch (error) {
        return res.status(500).send({
            error: error?.message || "Internal Server Error"
        });
    }
}

export const UpdateTrainer = async (req, res) => {
    try {
        const trainerData = req.body;
        const imageBaseUrl = process.env.BASE_URL_MEDIA || '';

        if (req.file) {
            trainerData.profilePicture = `${imageBaseUrl}/${req.file.path.replace(/\\/g, "/")}`;
        }
        const updatedTrainer = await updateTrainer(trainerData);
        return res.status(updatedTrainer.statusCode).send(updatedTrainer);
    } catch (e) {
        res.status(500).send({
            error: e?.message || "Internal Server Error"
        });
    }
}


export const DeleteTrainer = async (req, res) => {
    try {
        const trainerData = await deleteTrainer(req.body.id);
        res.status(trainerData.statusCode).send(trainerData)
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}




export const FindTrainerById = async (req, res) => {
    try {
        const trainerData = await TrainerModel.findById(req.body.id);
        if (trainerData) {
            res.status(200).send({ trainerData });
        } else {
            res.status(404).send({ message: "Trainer not found" });
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};
