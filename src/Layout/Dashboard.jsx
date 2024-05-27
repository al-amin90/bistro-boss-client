import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaCartShopping, FaListUl, FaUsers, FaUtensils } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoMail, IoWalletSharp } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { PiCalendarStarFill } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {

    // TODO: get admin value by db
    const [isAdmin] = useAdmin()
    // const isAdmin = true
    console.log(isAdmin);

    return (
        <div className='flex min-h-screen'>
            {/* deshboard side bar */}
            <div className='w-64 p-6 min-h-full font-cinzle bg-[#D1A054]'>
                <div className="md:block text-xl text-black pt-5 hidden font-extrabold">
                    <p>BISTRO BOSS</p>
                    <p className="font-semibold tracking-widest">Restaurant</p>
                </div>
                {
                    isAdmin ? <>
                        <ul className='menu pb-7 mt-10 p-0 space-y-4 text-sm font-medium'>
                            <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black hover:none"} to="/dashboard/adminHome">
                                <TiHome className='text-3xl' />
                                Admin Home
                            </NavLink></li>
                            <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/addItems">
                                <FaUtensils className='text-2xl mr-2' />
                                Add Item
                            </NavLink></li>
                            <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/payment">
                                <FaListUl className='text-2xl mr-2' />
                                Manage Items
                            </NavLink></li>
                            <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/bookings">
                                <FaBook className='text-2xl mr-2' />
                                Manage bookings
                            </NavLink></li>
                            <li className=''><NavLink className={({ isActive }) => isActive ? " text-white active:text-white " : " text-black"} to="/dashboard/allUsers">
                                <FaUsers className='text-2xl mr-2' />
                                All Users
                            </NavLink></li>


                        </ul>
                    </>
                        :
                        <>
                            <ul className='menu pb-7 mt-10  space-y-4 text-sm font-medium'>
                                <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black hover:none"} to="/dashboard/userHome">
                                    <TiHome className='text-3xl' />
                                    User Home
                                </NavLink></li>
                                <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/reservation">
                                    <FaCalendarDays className='text-2xl mr-2' />
                                    reservation
                                </NavLink></li>
                                <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/payment">
                                    <IoWalletSharp className='text-2xl mr-2' />
                                    payment history
                                </NavLink></li>
                                <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/cart">
                                    <FaCartShopping className='text-2xl mr-2' />
                                    my cart
                                </NavLink></li>
                                <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/review">
                                    <MdReviews className='text-2xl mr-2' />
                                    add review
                                </NavLink></li>
                                <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/booking">
                                    <PiCalendarStarFill className='text-2xl mr-2' />
                                    my booking
                                </NavLink></li>

                            </ul>
                        </>
                }

                {/* shared navlink */}

                <ul className='menu border-t pt-7 p-0 space-y-4 text-sm font-medium'>
                    <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/">
                        <TiHome className='text-3xl mr-1' />
                        Home
                    </NavLink></li>
                    <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/menu">
                        <FaBars className='text-2xl mr-2' />
                        Menu
                    </NavLink></li>
                    <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/order/salad">
                        <HiMiniShoppingBag className='text-2xl mr-2' />
                        Shop
                    </NavLink></li>
                    <li className=''><NavLink className={({ isActive }) => isActive ? " text-white " : " text-black"} to="/dashboard/sd">
                        <IoMail className='text-2xl mr-2' />
                        Contact
                    </NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 bg-[#F6F6F6]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;