import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";

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
                path: "/dashboard",
                element: <Home></Home>
            },
            {
                path: "/menu",
                element: <Home></Home>
            },
            {
                path: "/shop",
                element: <Home></Home>
            },
        ]
    },
]);