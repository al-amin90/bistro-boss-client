import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiTrash2 } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            return data
        }
    })
    console.log(users);

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
                axiosSecure.delete(`/users/${id}`)
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

    const handleMakeAdmin = async user => {
        try {
            const { data } = await axiosSecure.patch(`/users/admin/${user._id}`)
            console.log(data);

            if (data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 15000
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='w-[90%]  md:w-[80%] mx-auto'>
            <div className='pt-10 pb-3'>
                <SectionTitle
                    color={"black"}
                    heading={" MANAGE ALL USERS"}
                    subHeading={"How many??"}
                ></SectionTitle>
            </div>

            <div className='bg-white mb-20 p-10'>
                <div className='uppercase font-cinzle font-bold text-black flex items-center justify-between text-2xl'>
                    <h3>Total Users: {users.length}</h3>

                </div>

                <div className="overflow-x-auto  rounded-t-lg mt-10">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white text-sm '>
                            <tr className='*:font-normal *:py-4'>
                                <th>

                                </th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users?.map((c, idx) => (
                                    <tr key={idx} className='*:py-6'>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            {c.name}
                                        </td>
                                        <td>
                                            {c.email}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleMakeAdmin(c)} className={`p-3 rounded-md text-white ${c.role === 'admin' ? "bg-green-500" : "bg-[#D1A054]"}  `}>
                                                <FaUsers className='text-xl' />
                                            </button>
                                        </td>
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

export default AllUsers;