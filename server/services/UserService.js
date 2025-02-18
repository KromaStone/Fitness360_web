import UserModel from "../models/User.js";
import { createResponse, passwordHash } from "../utils/utilityFunctions.js";


export const getUsers = async (page, pageSize) => {
    const skip = (page - 1) * pageSize;
    const users = await UserModel.find().skip(skip).limit(pageSize);
    const totalUsers = await UserModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
    return {
        users,
        totalPages,
    };
}


// export const getUsers = async () => {
//     return await UserModel.find().select('firstName lastName age gender email profilePicture ');
// }

export const userCount = async () => {
    const count = UserModel.countDocuments()
    return await count;
}



export const createUser = async (userData) => {

    const isEmailExists = await getUserByEmail(userData.email);
    if (isEmailExists) {
        return createResponse(203, "Email Exists", null);
    } else {
        try {
            const hashedPassword = await passwordHash(userData.password);
            userData.password = hashedPassword;

            // Save user data, including profilePicture, to the database
            const newUser = await UserModel.create(userData);
            if (newUser) {
                return createResponse(201, "User Created", null);
            } else {
                return createResponse(202, "Unable to create user", null);
            }
        } catch (error) {
            throw new Error(error.message || "DB error");
        }
    }
};


export const deleteUser = async (id) => {
    const isUserExists = await getUserById(id);
    if (!isUserExists) {
        return createResponse(404, "User does not exist", null);
    } else {
        try {
            const user = await UserModel.deleteOne({ _id: id });
            if (user.deletedCount === 1) return createResponse(200, "User Deleted", null);
            else return createResponse(404, "User not deleted", null);
        } catch (error) {
            throw new Error(error.message || "DB error");
        }
    }
};

export const updateUser = async (req) => { //kk
    const isUserExist = await getUserById(req.body.id)
    if (!isUserExist) {
        return createResponse(404, "User does not exist", null);
    }
    else {
        try {
            const user = await UserModel.findByIdAndUpdate({ _id: req.body._id }, {
                role: req.body.role || "user",
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                gender: req.body.gender,
                email: req.body.email,
                password: req.body.password,
                contactNumber: req.body.contactNumber,
                profilePicture: req.body.profilePicture,
                height: req.body.height,
                weight: req.body.weight,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
            });
            if (user) return createResponse(200, "user updated", null);
            else return createResponse(400, "Unable to Updated", null);
        } catch (error) {
            throw new Error(error.message || "DB Error")
        }
    }
}

export const findUserById = async (id) => {
    const isUserExists = await getUserById(id);
    if (!isUserExists) {
        return createResponse(404, "User does not exist", null);
    }
    else {
        try {
            const user = await UserModel.findOne({ _id: id }).select('firstName lastName age gender height weight');
            return user
        } catch (error) {
            throw new Error(error.message || "DB Error")
        }
    }
}
export const getUserDetails = async (id) => {
    const isUserExists = await getUserById(id);
    if (!isUserExists) {
        return createResponse(404, "User does not exist", null);
    }
    else {
        try {
            const user = await UserModel.findOne({ _id: id }).select('firstName lastName email age gender height weight address city state contactNumber profilePicture');
            return user
        } catch (error) {
            throw new Error(error.message || "DB Error")
        }
    }
}



export const getUserById = async (id) => {
    const userExists = await UserModel.find({ _id: id });
    return userExists ? true : false;
};

export const getUserByEmail = async (email) => {
    const users = await UserModel.find({ email });
    return users.length > 0 ? true : false;
};