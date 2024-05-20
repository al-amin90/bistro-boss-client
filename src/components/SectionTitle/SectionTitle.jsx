import React from 'react';

const SectionTitle = ({ heading, subHeading, color }) => {
    return (
        <div className={`text-center flex flex-col justify-center items-center text-${color}`
        }>
            <h6 className='text-[#D99904] italic'>---{subHeading}---</h6>
            <h1 className=' mt-4 mb-12  px-6 mx-auto p-4 border-y-4 text-4xl'>{heading}</h1>
        </div>
    );
};

export default SectionTitle;