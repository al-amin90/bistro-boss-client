import cart from "../../assets/icon/cart.png"
import profile from "../../assets/profile.png"
import logo from "../../assets/logo.png"
import { NavLink } from 'react-router-dom';

const Navbar = () => {


    const navLinks = <div className='flex flex-col lg:flex-row items-center text-sm lg:gap-4 uppercase *:cursor-pointer font-semibold'>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            Home
        </NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            CONTACT us
        </NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            DASHBOARD
        </NavLink></li>
        <li><NavLink to="/menu" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            Our Menu
        </NavLink></li>
        <li><NavLink to="/shop" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            Our Shop
        </NavLink></li>
        <li>
            <img src={cart} className="w-11 lg:block hidden" alt="" />
        </li>
    </div>

    return (
        <div>
            <div className="navbar bg-[#1515157a] px-10 text-white fixed z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box bg-white/20 backdrop-blur-md w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex gap-3 font-extrabold font-cinzle items-end">
                        <img src={logo} className="w-12" alt="" />
                        <div className="md:block hidden">
                            <p>BISTRO BOSS</p>
                            <p className="font-normal tracking-widest">Restaurant</p>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="items-end justify-end flex px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="">
                    {/* <img className="" src={profile} alt="" /> */}
                    <div className="avatar">
                        <div className="w-9 ml-16 rounded-full">
                            <img src={profile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;