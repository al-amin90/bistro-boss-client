import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
    const { user } = useAuth()

    return (
        <div>
            <h2>hi welcome</h2>
            {
                user?.displayName ? user?.displayName : 'Back'
            }
        </div>
    );
};

export default UserHome;