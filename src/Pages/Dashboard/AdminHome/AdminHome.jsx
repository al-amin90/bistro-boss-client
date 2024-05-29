import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { IoWalletSharp } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa6';
import { LuChefHat } from "react-icons/lu";
import { FaTruck } from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: stats = {} } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-stats');
            return data
        }
    })
    const { data: chartData = [] } = useQuery({
        queryKey: ["order-stats"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/order-stats');
            return data
        }
    })


    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenues }
    })

    return (
        <div className=' mt-12 pr-10 px-6'>
            <h2 className='uppercase font-cinzle my-5 text-2xl font-bold'>Hi, Welcome Back!</h2>
            <div className='grid grid-cols-4 gap-6'>

                <div className="stat rounded-xl text-white p-8 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] flex justify-center items-center ">
                    <div className=""><IoWalletSharp className='text-5xl mr-2' /></div>
                    <div>
                        <div className="text-3xl font-bold">${stats?.revenue}</div>
                        <div className="text-2xl">Revenue</div>
                    </div>
                </div>
                <div className="stat rounded-xl text-white p-8 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] flex justify-center items-center ">
                    <div className=""><FaUsers className='text-5xl mr-2' /></div>
                    <div>
                        <div className="text-3xl font-bold">{stats?.users}</div>
                        <div className="text-2xl">Customers</div>
                    </div>
                </div>
                <div className="stat rounded-xl text-white p-8 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] flex justify-center items-center ">
                    <div className=""><LuChefHat className='text-5xl mr-2' /></div>
                    <div>
                        <div className="text-3xl font-bold">{stats?.menuItems}</div>
                        <div className="text-2xl">Products</div>
                    </div>
                </div>
                <div className="stat rounded-xl text-white p-8 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] flex justify-center items-center ">
                    <div className=""><FaTruck className='text-5xl mr-2' /></div>
                    <div>
                        <div className="text-3xl font-bold">{stats?.orders}</div>
                        <div className="text-2xl">Orders</div>
                    </div>
                </div>


            </div>

            <div className='flex  mt-20'>
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;