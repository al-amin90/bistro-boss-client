import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import axios from 'axios';
import FoodCard from '../../Shared/FoodCard';

const ChefRecommend = () => {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get('/menu.json')
            .then(res => {
                const popularItems = res.data.slice(1, 4)
                setMenu(popularItems)
            })
    }, [])
    // const { image, name, recipe, price } = item;

    return (
        <div className='w-[90%] relative my-24 md:w-[80%] mx-auto '>

            <SectionTitle
                color="black"
                heading={"CHEF RECOMMENDS"}
                subHeading={" Should Try"}
            ></SectionTitle>


            <div className='grid grid-cols-3 gap-6'>
                {
                    menu?.map((item, idx) => <FoodCard
                        key={idx}
                        item={item}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default ChefRecommend;