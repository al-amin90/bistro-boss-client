import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa6';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const axiosPublic = useAxiosPublic()

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.images[0] }
        console.log(imageFile);

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data);
    }



    return (
        <div className='w-[90%]  md:w-[80%] mx-auto'>
            <div className='pt-10 pb-3'>
                <SectionTitle
                    color={"black"}
                    heading="ADD AN ITEM"
                    subHeading="What's new?"
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
                            {...register("name", { required: true })} type="text" placeholder="Recipe name" className="input  w-full" />

                    </label>
                    <div className='flex gap-6 mt-3 items-center'>
                        <label
                            className="form-control w-full ">
                            <div className="label font-bold mb-1">
                                <span className="text-base">Category*</span>
                            </div>
                            <select
                                defaultValue="default"
                                {...register("category", { required: true })}
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
                            placeholder='Recipe Details' cols="30" rows="10"

                            {...register("recipe", {
                                validate: {
                                    pattern: (value) => !/[!]/.test(value)
                                }
                            })}
                        />


                    </label>

                    <div className='form-control'>

                        {/* <input {...register("image", { required: true })}
                            type="file" name="image"
                            className='mt-6 file-input' id="image" /> */}
                        <input
                            {...register('images', {
                                required: true,
                            })}
                            type="file"
                            className="w-full max-w-lg"
                        />
                    </div>


                    <button
                        type="submit"
                        className='py-3 mt-8 bg-gradient-to-r text-lg font-semibold from-[#845E24] to-[#B38030] px-5 flex items-center justify-center text-white'>Add Item  <FaUtensils className='text-lg ml-2' /></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;