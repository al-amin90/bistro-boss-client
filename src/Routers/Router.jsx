import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Cart from "../Pages/Dashboard/Cart/Cart";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRouter from "./AdminRouter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/contact",
                element: <Home></Home>
            },
            {
                path: "dashboard",
                element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/order/:category",
                element: <PrivateRouter><Order></Order></PrivateRouter>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        children: [
            {
                path: "userHome",
                element: <Cart></Cart>
            },

            // admin users
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "addItems",
                element: <AdminRouter><AddItems></AddItems></AdminRouter>
            },


            // normal users
            {
                path: "reservation",
                element: <Cart></Cart>
            },
            {
                path: "payment",
                element: <Cart></Cart>
            },
            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: "review",
                element: <Cart></Cart>
            },
            {
                path: "booking",
                element: <Cart></Cart>
            },
        ]
    }
]);