import axios from "axios";
import { totalTrainer, totalWorkout, Trainers, workout } from "../apiEndPoint/EnpPoint";


const token = localStorage.getItem('token') || sessionStorage.getItem('token');

export const trainerCount = async () => {
    try {
        const response = await axios.get(totalTrainer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.totalTrainer;
    } catch (error) {
        console.log("Unable to access API!", error);
    }
}

export const workoutCount = async () => {
    try {
        const response = await axios.get(totalWorkout, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("unable to get workouts ", error)
    }
}

export const getAllTrainers = async (page, pageSize) => {
    try {
        const response = await axios.get(`${Trainers}?page=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Unable to access API!", error);
    }
};


export const CreateTrainer = async (formData) => {
    try {
        const response = await axios.post(Trainers, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.log("unable to access API", error);
        throw error;
    }
}
export const UpdateTrainer = async (formData) => {
    console.log("formData", formData)
    try {
        const response = await axios.put(Trainers, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Update trainer error:", error);
        throw error;
    }
}
export const DeleteTrainer = async (id) => {
    try {
        const response = await axios.delete(Trainers, {
            data: { id },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log("Unable to access API", error);
    }
}

