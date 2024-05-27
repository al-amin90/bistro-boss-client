import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useState } from 'react';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItem = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [isImage, setImage] = useState(null)


    const { name, category, price, image, _id, recipe } = useLoaderData();


    const onSubmit = async (data) => {
        // image upload to imgbb and then get an url
        console.log(data.images[0]);

        if (data.images[0]) {
            const imageFile = { image: data.images[0] }
            console.log(imageFile);

            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            setImage(res)
        }



        // now menu itm data to the server with the image
        console.log(isImage?.data?.data);
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: isImage?.data?.data?.display_url || image
        }
        console.log(menuItem);
        // 
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
        console.log(menuRes.data);

        if (menuRes.data.modifiedCount > 0) {
            // show success popup
            // reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is Updated to the menu!`,
                showConfirmButton: false,
                timer: 15000
            });
        }

    }

    return (
        <div className='w-[90%]  md:w-[80%] mx-auto'>
            <div className='pt-10 pb-3'>
                <SectionTitle
                    color={"black"}
                    heading={" UPDATE ITEM"}
                    subHeading={"Let's go!"}
                ></SectionTitle>
            </div>

            <div className='bg-[#F3F3F3] p-12'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label
                        className="form-control w-full ">
                        <div className="label font-bold  mb-1">
                            <span className="text-base">Recipe name*</span>
                        </div>
                        <input
                            defaultValue={name}
                            {...register("name", { required: true })} type="text" placeholder="Recipe name" className="input  w-full" />

                    </label>
                    <div className='flex gap-6 mt-3 items-center'>
                        <label
                            className="form-control w-full ">
                            <div className="label font-bold mb-1">
                                <span className="text-base">Category*</span>
                            </div>
                            <select
                                {...register("category", { required: true })}
                                defaultValue={category}
                                className="select  w-full">
                                <option value="">Select a category</option>
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">dessert</option>
                                <option value="drinks">drinks</option>
                            </select>

                        </label>

                        <label
                            className="form-control w-full ">
                            <div className="label font-bold mb-1">
                                <span className="text-base">Price*</span>
                            </div>
                            <input
                                defaultValue={price}
                                {...register("price", { required: true })}
                                type="number" placeholder="Price" className="input  w-full" />

                        </label>
                    </div>

                    <label
                        className="form-control w-full ">
                        <div className="label font-bold mb-1">
                            <span className="text-base">Recipe Details*</span>
                        </div>

                        <textarea
                            className='p-5 textarea rounded-lg'
                            defaultValue={recipe}
                            placeholder='Recipe Details' cols="30" rows="10"

                            {...register("recipe", {
                                validate: {
                                    pattern: (value) => !/[!]/.test(value)
                                }
                            })}
                        />


                    </label>

                    <div className='form-control'>

                        <input
                            {...register('images')}
                            type="file"
                            className="w-full mt-6 file-input max-w-lg"
                        />
                    </div>

                    <div className='flex items-center justify-center'>
                        <button
                            type="submit"
                            className='py-3 mt-8 bg-gradient-to-r text-lg font-semibold from-[#845E24] to-[#B38030] px-5 flex items-center justify-center text-white'>Update Recipe Details</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;