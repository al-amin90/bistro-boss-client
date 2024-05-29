import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user.email}`)
            return data
        }
    })
    console.log(payments);

    return (
        <div className='w-[90%]  md:w-[80%] mx-auto'>
            <div className='pt-10 pb-3'>
                <SectionTitle
                    color={"black"}
                    heading={" PAYMENT HISTORY"}
                    subHeading={"At a Glance!"}
                ></SectionTitle>
            </div>


            <div className='bg-white mb-20 p-10'>
                <div className='uppercase font-cinzle font-bold text-black flex items-center justify-between text-2xl'>
                    <h3>Total Payments: {payments?.length}</h3>

                </div>

                <div className="overflow-x-auto  rounded-t-lg mt-10">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white text-sm '>
                            <tr className='*:font-normal *:py-4'>
                                <th>EMAIL</th>
                                <th>PRICE</th>
                                <th>Transaction Id</th>
                                <th>PAYENT DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                payments?.map((c, idx) => (
                                    <tr key={idx} className='*:py-6'>
                                        <td>
                                            {c.email}
                                        </td>
                                        <td>
                                            {c.price}
                                        </td>
                                        <td>{c.transactionId}</td>
                                        <th>
                                            {new Date(c.data).toLocaleDateString()}
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

export default PaymentHistory;