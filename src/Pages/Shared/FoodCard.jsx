import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../Utilis/.baseURL';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, price, _id, image } = item;
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()


    const handleAddToCart = food => {
        if (user && user.email) {
            // TODO: Sent cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                price,
                image
            }

            axiosSecure.post(`${baseURL}/carts`, cartItem)
                .then(res => {
                    // console.log(res.data);
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In?",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }


    return (
        <div
            className="bg-[#F3F3F3] flex items-center relative justify-center flex-col text-black">
            <img src={item?.image} alt="" className="object-cover object-center w-full h-72" />
            <div className="flex  flex-col justify-between p-6 space-y-8">
                <div className="space-y-2 px-3 text-center">
                    <h2 className="text-xl font-semibold tracking-wide">{item?.name}</h2>
                    <p className="text-xs font-medium">{item?.recipe.slice(0, 50)}..</p>
                </div>
            </div>
            <div className='bg-black absolute top-4 right-4 text-white px-3 py-2 text-sm'>${item.price}</div>
            <button onClick={() => handleAddToCart(item)} className="uppercase mb-6 bg-transparent border-x-0 text-[#BB8506] font-medium border-t-0 border-b-2 border-[#BB8506] hover:bg-[#1F2937] btn">add to cart</button>
        </div>
    );
};

export default FoodCard;