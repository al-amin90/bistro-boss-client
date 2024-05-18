import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import axios from 'axios';

const ChefRecommend = () => {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get('/menu.json')
            .then(res => {
                const popularItems = res.data.slice(1, 4)
                setMenu(popularItems)
            })
    }, [])
    console.log(menu);

    // const { image, name, recipe, price } = item;

    return (
        <div className='w-[90%] relative my-24 md:w-[80%] mx-auto '>
            <SectionTitle
                heading={"CHEF RECOMMENDS"}
                subHeading={" Should Try"}
            ></SectionTitle>

            <div className='grid grid-cols-3 gap-6'>
                {
                    menu?.map(item => <div
                        key={item?._id}
                        className="bg-[#F3F3F3] flex items-center justify-center flex-col text-black">
                        <img src={item?.image} alt="" className="object-cover object-center w-full h-72" />
                        <div className="flex  flex-col justify-between p-6 space-y-8">
                            <div className="space-y-2 px-3 text-center">
                                <h2 className="text-xl font-semibold tracking-wide">{item?.name}</h2>
                                <p className="text-xs font-medium">{item?.recipe.slice(0, 50)}..</p>
                            </div>
                        </div>
                        <button type="button" className="uppercase mb-6 bg-transparent border-x-0 text-[#BB8506] font-medium border-t-0 border-b-2 border-[#BB8506] hover:bg-[#1F2937] btn">add to cart</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ChefRecommend;