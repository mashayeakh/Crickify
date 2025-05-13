import React, { useContext } from 'react'
import { AuthContext } from './../Context/AuthContextProvider';
import { Navigate, useNavigate } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    // const navigate = useNavigate();
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    return children;
}

export default PrivateRoutes