import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const ApplicationUserContext = createContext(null);

export const ApplicationUserProvider = ({ children }) => {
    const [appUserId, setUserId] = useState(null);
    const [appUserData, setUserData] = useState(null);
    const [appUserName, setUserName] = useState('');
    const [appUserEmail, setUserEmail] = useState('');
    const [appUserofilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
            setUserName(decodedToken.userName);
            setUserEmail(decodedToken.email);
            setProfilePicture(decodedToken.profilePicture);
            setUserData(decodedToken);
        }
        setLoading(false);
    };

    if (loading) {
        return <Spinner label="Loading..." color="success" className="bg-light dark:bg-background w-screen h-screen" />
    }

    return (
        <ApplicationUserContext.Provider value={{ appUserId, appUserData, appUserEmail, appUserName, appUserofilePicture }}>
            {children}
        </ApplicationUserContext.Provider>
    );
}

export const useApplicationUser = () => useContext(ApplicationUserContext);
