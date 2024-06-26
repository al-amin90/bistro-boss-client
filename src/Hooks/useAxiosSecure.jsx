import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const axiosSecure = axios.create({
    baseURL: "https://bistro-boss-server-pink-one.vercel.app"
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()

    // requested interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        // console.log("request stopped by interceptors", token);
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    // interceptor 401 && 403 status 
    axiosSecure.interceptors.response.use(function (response) {


        return response
    }, async (error) => {
        const status = error.response.status
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        // console.log("status error in the interceptor", status);
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;