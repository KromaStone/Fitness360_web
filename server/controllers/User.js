import { createUser, deleteUser, findUserById, getUserDetails, getUsers, updateUser, userCount } from '../services/UserService.js';
import { validatePagination } from '../utils/utilityFunctions.js';
// const imageBaseUrl = 'http://localhost:8080';

export const UserCount = async (req, res) => {
    try {
        const totalUser = await userCount();
        res.status(200).send({ totalUser })

    } catch (e) {
        res.status(404).send({
            error: e?.message
        });
    }
}



export const GetUsers = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const { validatedPage, validatedPageSize } = validatePagination(page, pageSize);
        const userData = await getUsers(validatedPage, validatedPageSize);
        res.status(200).send({ userData });
    } catch (e) {
        res.status(404).send({
            error: e?.message
        });
    }
}

export const CreateUser = async (req, res) => {
    try {
        const userData = req.body;
        if (req.file) {
            const imageBaseUrl = process.env.BASE_URL_MEDIA;
            userData.profilePicture = await `${imageBaseUrl}/${req.file.path.replace(/\\/g, "/")}`;
        }
        const userResponse = await createUser(userData);
        return res.status(userResponse.statusCode).send(userResponse);
    } catch (e) {
        return res.status(500).send({
            error: e?.message || "Internal Server Error",
        });
    }
};

export const UpdateUser = async (req, res) => {
    try {
        const userData = await updateUser(req);
        return res.status(userData.statusCode).send(userData);
    } catch (e) {
        res.status(404).send({ error: e?.message });
    }
}

export const DeleteUser = async (req, res) => {
    try {
        const userData = await deleteUser(req.body.id);
        res.status(userData.statusCode).send(userData);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const FindUserById = async (req, res) => {
    try {
        const userData = await findUserById(req.query.id); 
        if (!userData) {
            return res.status(404).send({ error: "User does not exist" });
        }
        res.status(200).send(userData);
    } catch (e) {
        res.status(500).send({ error: e.message || "Internal Server Error" }); 
    }
};
export const GetUserDetails = async (req, res) => {
    try {
        const userData = await getUserDetails(req.query.id);
        if (!userData) {
            return res.status(404).send({ error: "User does not exist" });
        }
        res.status(200).send(userData);
    } catch (e) {
        res.status(500).send({ error: e.message || "Internal Server Error" });
    }
};
