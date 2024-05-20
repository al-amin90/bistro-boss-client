import React from 'react';

const MenuItem = ({ item }) => {
    const { image, name, recipe, price } = item;

    return (
        <div className='flex space-x-7'>

            <img className=' rounded-b-full object-center rounded-r-full shadow-xl w-[70px] h-[70px] object-cover' src={image} alt="" />
            <div>
                <h3 className='uppercase font-cinzle text-black font-medium'>{name} ----------------</h3>
                <p className='text-xs mt-2'>{recipe.slice(0, 70)}...</p>
            </div>
            <p className='text-[#BB8506]'>${price}</p>


        </div>
    );
};

export default MenuItem;