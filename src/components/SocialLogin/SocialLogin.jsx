import google from "../../assets/others/goog.png";
import face from "../../assets/others/face.png";
import git from "../../assets/others/git.png";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { singInWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSingIn = () => {
        singInWithGoogle()
            .then(result => {
                console.log(result);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(from, { replace: true })
                    })
            })
    }

    return (
        <div className="flex items-center gap-8 *:cursor-pointer justify-center mt-5">
            <img src={face} alt="" />
            <img
                onClick={handleGoogleSingIn}
                src={google} alt="" />
            <img src={git} alt="" />
        </div>
    );
};

export default SocialLogin;