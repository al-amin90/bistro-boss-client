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
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import { baseURL } from "../Utilis/.baseURL";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

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

            // admin users
            {
                path: "adminHome",
                element: <AdminRouter><AdminHome></AdminHome></AdminRouter>
            },
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "addItems",
                element: <AdminRouter><AddItems></AddItems></AdminRouter>
            },
            {
                path: "manageItems",
                element: <AdminRouter><ManageItems></ManageItems></AdminRouter>
            },
            {
                path: "updateItem/:id",
                element: <AdminRouter><UpdateItem></UpdateItem></AdminRouter>,
                loader: ({ params }) => fetch(`${baseURL}/menu/${params.id}`)
            },


            // normal users
            {
                path: "userHome",
                element: <Cart></Cart>
            },
            {
                path: "reservation",
                element: <Cart></Cart>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "booking",
                element: <Cart></Cart>
            },
        ]
    }
]);