import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import cartImg from "../../assets/icon/cart.png"
import profile from "../../assets/profile.png"
import { Link, NavLink } from 'react-router-dom';
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useAuth()
    const [cart] = useCart()
    const [isAdmin] = useAdmin()

    const navLinks = <div className='flex flex-col lg:flex-row items-center text-sm lg:gap-4 uppercase *:cursor-pointer font-semibold'>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            Home
        </NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            CONTACT us
        </NavLink></li>
        {
            user && isAdmin && <li><NavLink to="/dashboard/adminHome" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
                DASHBOARD
            </NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to="/dashboard/userHome" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
                DASHBOARD
            </NavLink></li>
        }
        <li><NavLink to="/menu" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            Our Menu
        </NavLink></li>
        <li><NavLink to="/order/salads" className={({ isActive }) => isActive ? "font-bold text-[#EEFF25]" : ""}>
            order Food
        </NavLink></li>
        <li>
            <Link to="/dashboard/cart">
                <button className="relative hidden md:block" >
                    <img src={cartImg} className="w-11 " alt="" />
                    <div className="badge text-xs absolute -right-3 bottom-0 border-none text-white bg-[#FF0000]">+{cart?.length}</div>
                </button>

            </Link>
        </li>
    </div>


    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Log Out!",
                    text: "Log Out successFully!",
                    icon: "success"
                });
            })
    }

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
                        <img src="/logo.png" className="w-12" alt="" />
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
                    {user ?
                        <button onClick={handleLogOut} className="font-bold ml-16 mr-4 rounded-sm py-1 px-3 bg-[#ff2c258a] text-white">LogOut</button>
                        :
                        <>
                            <Link to="/login">
                                <button className="font-bold ml-16 mr-4 rounded-sm py-1 px-3 bg-[#edff258a] text-white">Login</button>
                            </Link>
                        </>}

                    <div className="avatar">
                        <div className="w-9  rounded-full">
                            <img src={user?.photoURL || profile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;