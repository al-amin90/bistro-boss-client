import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRouter = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()

    if (loading || isAdminLoading) {
        return <progress className='w-64 progress'></progress>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/" state={{ from: location }} replace="true"></Navigate>
};

export default AdminRouter;