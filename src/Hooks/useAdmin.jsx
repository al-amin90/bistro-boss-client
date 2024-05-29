import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure, { axiosSecure } from './useAxiosSecure';

const useAdmin = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            // console.log("asking and checking is admin", user);
            const { data } = await axiosSecure.get(`/user/admin/${user.email}`)
            return data?.admin
        }
    })

    return [isAdmin, isAdminLoading]
};

export default useAdmin;