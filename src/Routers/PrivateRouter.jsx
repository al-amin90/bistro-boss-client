import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()


    if (loading) {
        return <p>Loading................................................</p>
    }

    if (user) {
        return children
    }


    return <Navigate to="/login" state={{ from: location }} replace={true}></Navigate>
};

export default PrivateRouter;