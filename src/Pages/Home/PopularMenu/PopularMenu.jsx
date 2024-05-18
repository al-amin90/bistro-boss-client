import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import axios from 'axios';
import MenuItem from '../../Shared/MenuItem';

const PopularMenu = () => {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get('/menu.json')
            .then(res => {
                const popularItems = res.data.filter(item => item.category === "popular")
                setMenu(popularItems)
            })
    }, [])


    return (
        <section className='w-[90%] my-28 md:w-[80%] mx-auto '>
            <SectionTitle
                heading={"From Our Menu"}
                subHeading={"Popular Items"}
            ></SectionTitle>

            <div className='grid grid-cols-2 mt-16 gap-6'>
                {
                    menu?.map(item => <MenuItem
                        item={item}
                        key={item._id}></MenuItem>)
                }
            </div>

            <div className='flex items-center justify-center mt-16'>
                <button className='uppercase bg-transparent border-x-0 text-black border-t-0 border-b-2 border-black btn'>View Full  Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;