import React from 'react';
import { Helmet } from 'react-helmet-async';

const UseHelmet = ({ name }) => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | {name}</title>
            </Helmet>
        </div>
    );
};

export default UseHelmet;