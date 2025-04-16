/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ component: Component, role: role }) {
    const navigate = useNavigate();

    useEffect(() => {
        validateToken();
    }, [navigate]);

    const validateToken = async () => {
        const user = localStorage.getItem('token') || sessionStorage.getItem('token');
        const decodedToken = await jwtDecode(user);
        if (decodedToken.role !== role) {
            navigate('/login');
        }
    }
    const user = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!user) {
        navigate('/login');
        return null;

    }
    if (user === null) {
        navigate('/login');

    }

    return <Component />;
}

export default ProtectedRoute;
