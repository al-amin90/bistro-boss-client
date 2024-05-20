import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem';
import useMenu from '../../../Hooks/useMenu';
import MenuCategory from '../../Menu/MenuCategory/MenuCategory';

const PopularMenu = () => {
    const { menu, loading } = useMenu()
    const popular = menu.filter(item => item.category === "popular")

    // const [menu, setMenu] = useState([])

    // useEffect(() => {
    //     axios.get('/menu.json')
    //         .then(res => {
    //             const popularItems = res.data.filter(item => item.category === "popular")
    //             setMenu(popularItems)
    //         })
    // }, [])


    return (
        <section className='w-[90%] my-28 md:w-[80%] mx-auto '>

            <SectionTitle
                color="black"
                heading={"From Our Menu"}
                subHeading={"Popular Items"}
            ></SectionTitle>

            <MenuCategory items={popular}></MenuCategory>

            <div className='flex items-center justify-center mt-16'>
                <button className='uppercase bg-transparent border-x-0 text-black border-t-0 border-b-2 border-black btn'>View Full  Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;