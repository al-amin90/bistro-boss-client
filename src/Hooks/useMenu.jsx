import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../Utilis/.baseURL";


const useMenu = () => {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${baseURL}/menu`)
            .then(res => {
                setMenu(res.data)
                setLoading(false)
            })
    }, [])


    return { menu, loading }
};

export default useMenu;