import login from '../../assets/others/authentication.gif';
import google from '../../assets/others/goog.png';
import face from '../../assets/others/face.png';
import git from '../../assets/others/git.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import UseHelmet from '../../components/UseHelmet/UseHelmet';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {
    const captchaRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";


    const { singInUser, loading } = useAuth()


    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        const user_captcha_value = captchaRef.current.value;
        console.log(email, password);

        // if (validateCaptcha(user_captcha_value) === true) {

        // }
        // else {
        //     Swal.fire({
        //         title: "Errror!",
        //         text: "Captcha Does Not Match!",
        //         icon: "error"
        //     });
        //     return
        // }


        singInUser(email, password)
            .then(result => {
                navigate(from, { replace: true })
                Swal.fire({
                    icon: "success",
                    title: "Log in successFully",
                    showClass: {
                        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
                    },
                    hideClass: {
                        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
                    },
                });

            })
    }


    return (
        <>
            <UseHelmet name={"Sing In"}></UseHelmet>

            <div className='w-full h-full bg-[#FAFBFD]'>
                <div className="hero min-h-screen w-[90%] md:w-[80%] mx-auto">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="text-center md:w-1/2 lg:text-left">
                            <img src={login} alt="" />
                        </div>
                        <div className="card shrink-0 md:w-1/2 max-w-md">

                            <form onSubmit={handleLogin} className="card-body text-black">
                                <h2 className=' text-center font-bold mb-4 text-3xl'>Login</h2>
                                <div className="form-control">
                                    <label className="label  ">
                                        <span className="label-text text-base font-bold">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="Type the Email" className="input text-sm rounded-md input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label  ">
                                        <span className="label-text text-base font-bold">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="Type the password" className="input text-sm rounded-md input-bordered" required />

                                </div>
                                <div className="form-control">
                                    <label className="label  ">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input type="text" ref={captchaRef} placeholder="Type the text above" className="input text-sm rounded-md input-bordered" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button type='submit' className="btn text-white bg-[#d19f54bb]">Sign In</button>
                                </div>
                            </form>
                            <div>
                                <p className='text-center -mt-3 text-[#D1A054]'>New here? <span
                                    onClick={() => navigate('/register')}
                                    className='font-semibold cursor-pointer'>
                                    Create a New Account
                                </span></p>
                                <p className='text-center mt-3'>Or sign in with
                                </p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Login;