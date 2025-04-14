import bcrypt from 'bcryptjs'



export const passwordHash = (password) => {
    const hashedPassword = bcrypt.hash(password, 10)
    return hashedPassword;
}


export const createResponse = (statusCode, message, token = null) => {
    return {
        statusCode,
        message,
        token: token || null
    }
}

export const validatePagination = (page, pageSize) => {
    const validatedPage = Math.max(parseInt(page, 10), 1);
    const validatedPageSize = Math.max(parseInt(pageSize, 10), 1);
    return { validatedPage, validatedPageSize };
};

export default class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}