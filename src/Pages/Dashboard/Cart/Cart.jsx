import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useCart from '../../../Hooks/useCart';
import { FiTrash2 } from "react-icons/fi";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })


            }
        });
    }

    return (
        <div className='w-[90%]  md:w-[80%] mx-auto'>
            <div className='pt-10 pb-3'>
                <SectionTitle
                    color={"black"}
                    heading={" WANNA ADD MORE?"}
                    subHeading={"My Cart"}
                ></SectionTitle>
            </div>


            <div className='bg-white mb-20 p-10'>
                <div className='uppercase font-cinzle font-bold text-black flex items-center justify-between text-2xl'>
                    <h3>Total orders: {cart.length}</h3>
                    <h3>total price: ${totalPrice}</h3>
                    {cart.length ? <Link to="/dashboard/payment">
                        <button className='text-white text-lg btn bg-[#D1A054]'>pay</button>
                    </Link>
                        :
                        <button disabled className='text-white text-lg btn bg-[#D1A054]'>pay</button>
                    }
                </div>

                <div className="overflow-x-auto  rounded-t-lg mt-10">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white text-sm '>
                            <tr className='*:font-normal *:py-4'>
                                <th>

                                </th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart?.map((c, idx) => (
                                    <tr key={idx} className='*:py-6'>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={c?.image} />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {c.name}
                                        </td>
                                        <td>{c.price}</td>
                                        <th>
                                            <button onClick={() => handleDelete(c._id)} className="p-3 rounded-md text-white bg-[#B91C1C]  ">
                                                <FiTrash2 className='text-xl' />
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;