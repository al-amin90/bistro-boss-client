import { useNavigate } from "react-router-dom";
import loginBG from "../../assets/others/authentication.png";
import registerImg from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form";
import UseHelmet from "../../components/UseHelmet/UseHelmet";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      updateProfile(loggedUser, {
        displayName: data.name,
        photoURL: data.photo,
      }).then(() => {
        setUser({
          ...user,
          displayName: data.name,
          photoURL: data.photo,
        });

        // create user entry in db
        const userInfo = {
          name: data.name,
          email: data.email,
          photo: data.photo,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to the database");
            reset();
            Swal.fire({
              title: "Sing Up successFully",
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
            navigate("/");
          }
        });
      });
    });
  };

  return (
    <>
      <UseHelmet name={"Sing Up"}></UseHelmet>

      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBG})` }}
      >
        <div className="hero min-h-screen w-[90%] md:w-[80%] mx-auto">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center md:w-1/2 lg:text-left">
              <img src={registerImg} alt="" />
            </div>
            <div className="card shrink-0 md:w-1/2 max-w-md">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body text-black"
              >
                <h2 className=" text-center font-bold mb-4 text-3xl">
                  Sign Up
                </h2>
                <div className="form-control">
                  <label className="label  ">
                    <span className="label-text text-base font-bold">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="Type the Name"
                    className="input text-sm rounded-md input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-500 mt-2">
                      This name is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label  ">
                    <span className="label-text text-base font-bold">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("photo")}
                    name="photo"
                    placeholder="Type the Photo URL"
                    className="input text-sm rounded-md input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label  ">
                    <span className="label-text text-base font-bold">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="Type the Email"
                    className="input text-sm rounded-md input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-500 mt-2">
                      This name is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label  ">
                    <span className="label-text text-base font-bold">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      maxLength: 16,
                      minLength: 6,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    name="password"
                    placeholder="Type the password"
                    className="input text-sm rounded-md input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500 mt-2">First name is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500 mt-2">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-500 mt-2">
                      Password must be less than 16 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-500 mt-2">
                      Password must have a uppercase,lowercase,number and
                      special characters
                    </p>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn text-white bg-[#d19f54bb]"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div>
                <p className="text-center -mt-3 text-[#D1A054]">
                  Already registered?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="font-semibold cursor-pointer"
                  >
                    Go to log in
                  </span>
                </p>
                <p className="text-center mt-3">Or sign in with</p>
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
