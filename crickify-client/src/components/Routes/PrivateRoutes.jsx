import React, { useContext } from 'react'
import { AuthContext } from './../Context/AuthContextProvider';
import { useNavigate } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    if (!user) {
        navigate("/");
    }
    return children;
}

export default PrivateRoutes