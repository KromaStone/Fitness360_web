import bcrypt from 'bcryptjs';
import { createResponse } from "../utils/utilityFunctions.js";
import UserModel from '../models/User.js';
import TrainerModel from '../models/Trainers.js';
import AdminModel from '../models/Admin.js';
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';
import { getUserByEmail } from './UserService.js';

const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

export const login = async (userData) => {
    const user = await FindUserByEmail(userData.email);
    if (!user) {
        return createResponse(201, "User Not Found", null);
    }
    try {
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            return createResponse(211, "Invalid Password", null);
        }
        const token = await createJwtToken(user)

        return createResponse(200, "Login Successful", token);
    } catch (error) {
        throw new Error(error.message || "DB error");
    }
};

export const openAuthentication = async (data) => {
    try {
        if (data.provider === 'Google') {
            const token = data.token.credential;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: clientId,
            });
            const payload = ticket.getPayload();
            console.log('payload', payload);
            const isEmailExists = await getUserByEmail(payload.email);

            if (isEmailExists) {
                const userData = {
                    email: payload.email,
                    firstName: payload.name,
                    profilePicture: payload.picture,
                    role: 'user'
                };
                const jwtToken = await createJwtToken(userData);
                return createResponse(200, "Login Successful", jwtToken);
            } else {
                const userData = {
                    googleId: payload.sub,
                    email: payload.email,
                    firstName: payload.name,
                    profilePicture: payload.picture,
                    role: 'user'
                };
                const newUser = await UserModel.create(userData);
                if (newUser) {
                    const jwtToken = await createJwtToken(newUser);
                    return createResponse(200, "User Created and Logged In", jwtToken);
                } else {
                    return createResponse(202, "Unable to create user", null);
                }
            }
        }
        else if (data.provider === 'Facebook') {
            const isEmailExists = await getUserByEmail(data.email);
            if (isEmailExists) {
                const userData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    profilePicture: data.profilePicture,
                    role: 'user'
                }
                const jwtToken = await createJwtToken(userData);
                return createResponse(200, "Login Successful", jwtToken);
            } else {
                const userData = {
                    facebookId: data.facebookId,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profilePicture: data.profilePicture,
                    role: 'user'
                };
                const newUser = await UserModel.create(userData);
                if (newUser) {
                    const jwtToken = await createJwtToken(newUser);
                    return createResponse(200, "User Created and Logged In", jwtToken);
                } else {
                    return createResponse(202, "Unable to create user", null);
                }
            }
        }
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};



// export const FindUserByEmail = async (email) => {
//     const user = await UserModel.findOne({ email });
//     return user;
// };
export const FindUserByEmail = async (email) => {
    console.log('email', email);

    const models = [UserModel, TrainerModel, AdminModel];
    for (const model of models) {
        const user = await model.findOne({ email });
        if (user) {
            return user;
        }
    }
    return null;
};


export const createJwtToken = async (user) => {
    try {
        const jwtToken = await jwt.sign(
            {
                userName: user.firstName + ' ' + user?.lastName,
                email: user.email,
                id: user._id,
                role: user.role,
                profilePicture: user.profilePicture
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );
        return jwtToken;
    } catch (error) {
        return null
    }
}