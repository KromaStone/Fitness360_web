import { jwtDecode } from 'jwt-decode';


export const verifyAndCheckRole = (allowedRoles) => {

    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];


        if (!token) {
            return res.status(205).json({ message: 'Access Denied: No Token Provided' });
        }

        try {
            const decodedToken = jwtDecode(token);
            req.user = decodedToken;
            const userRole = decodedToken.role.toLowerCase();

            // // Note: complete after validations and workout work
            // const currentTime = Date.now() / 1000;
            // if (decodedToken.exp < currentTime) {
            //     return res.status(205).json({ message: 'Token has expired' });
            // }

            if (!allowedRoles.includes(userRole)) {
                return res.status(205).json({ message: 'Access Denied: Invalid Role' });
            }
            next();

        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    };
};
