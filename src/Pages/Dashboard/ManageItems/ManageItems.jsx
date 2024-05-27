import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const ManageItems = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users, refetch } = useQuery({
        queryKey: ['manageUser'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/menu')
            return data
        }
    })
    console.log(users);

    const handleDelete = item => {
        console.log(item);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/menu/${item._id}`)

                if (data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });

                }



            }
        });
    }

    const handleEdit = () => {

    }

    return (
        <div className='w-[90%]  md:w-[80%] mx-auto'>
            <div className='pt-10 pb-3'>
                <SectionTitle
                    color={"black"}
                    heading={" MANAGE ALL ITEMS"}
                    subHeading={"Hurry Up??"}
                ></SectionTitle>
            </div>


            <div className='bg-white mb-20 p-10'>
                <div className='uppercase font-cinzle font-bold text-black flex items-center justify-between text-2xl'>
                    <h3>Total items: {users?.length}</h3>

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
                                <th>EDIT</th>
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
                                        <td>
                                            {c.price}
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/updateItem/${c._id}`}>
                                                <button
                                                    onClick={() => handleEdit(c)} className={`p-3 rounded-md text-white bg-[#D1A054]  `}>
                                                    <FiEdit className='text-xl' />
                                                </button>
                                            </Link>
                                        </td>
                                        <th>
                                            <button onClick={() => handleDelete(c)} className="p-3 rounded-md text-white bg-[#B91C1C]  ">
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

export default ManageItems;