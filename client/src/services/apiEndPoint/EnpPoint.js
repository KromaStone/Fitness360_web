const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Login = `${BASE_URL}login`;
export const oAuthLogin = `${BASE_URL}oauth`

export const Users = `${BASE_URL}user`;
export const totalUser = `${BASE_URL}totaluser`;
export const userdetail = `${BASE_URL}finduserbyid`
export const getUserdetails = `${BASE_URL}getUserDetails`

export const Trainers = `${BASE_URL}trainer`;
export const totalTrainer = `${BASE_URL}trainercount`;
export const totalWorkout = `${BASE_URL}workoutcount`
export const knowTrainer = {
    getAllTrainer: () => `${BASE_URL}knowtrainer`, // Pagination handled by service file
};
export const trainerName = `${BASE_URL}trainername`;

export const workout = `${BASE_URL}workout`;
export const workoutbyCategory = `${BASE_URL}workoutbycategory`;
export const enrollWorkout = `${BASE_URL}enrollWorkout`

export const productsEp = `${BASE_URL}product`;