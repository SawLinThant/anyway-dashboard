import { useForm } from "react-hook-form";
import Input from "../../common/components/custom-input";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginCard = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError,setLoginError] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
 

  const navigate = useNavigate();
  const handleLogin = handleSubmit(async(credentials) => {
    try{
        if(
          credentials.name !== "admin" || credentials.password !=="anyway10222024"
        ){
          setLoginError(true);
        }

        if(credentials.name === "admin" & credentials.password ==="anyway10222024"){
         
          //const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const updatedUserData = ({
            email: credentials.name,
            password: credentials.password,
          })
          setUserData(updatedUserData)
          setIsLogin(true);
          localStorage.setItem("user", JSON.stringify(userData));
          navigate('/dashboard')
        }
    }catch(err){
      throw new Error("error logging in")
    }
  }) 
  return (
    <div className="lg:w-[60rem] lg:h-[30rem] md:w-[90vw] md:h-[30rem] bg-white rounded-lg shadow-lg border p-7">
      <div className="w-full h-full grid grid-cols-2">
        <div className="w-full h-full p-4 border-r">
          <div className="w-full h-full flex flex-col gap-4 justify-center text-secondary text-center">
            <h2 className="font-bold text-black">Admin Dashboard</h2>
            <h1 className="font-pacifico font-bold text-4xl">AnyWay</h1>
          </div>
        </div>
        <div className="w-full h-full p-4">
          <div className="w-full h-full flex flex-col gap-4 justify-center">
            <h2 className="text-center text-3xl font-bold">Login</h2>
            <div className="w-full h-full mt-7">
              <form onSubmit={handleLogin} className="w-full h-full flex flex-col gap-4" action="">
                <Input
                  type="text"
                  label="Username"
                  name="name"
                  placeholder={
                    errors.name ? "Invalid" : "Please enter your name"
                  }
                  {...register("name", { required: "Name is required" })}
                />
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  placeholder={
                    errors.password ? "Invalid" : "Please enter your password"
                  }
                  {...register("password", { required: "Name is required" })}
                />
               {loginError?<span className="text-rose-800">Wrong Credentials!</span>:""} 
                <button
                  //disabled={createLoading}
                  className={clsx(
                    "rounded-md px-2 py-3 h-[3rem] bg-secondary  w-full mt-7 font-bold text-primary",
                    // {
                    //   "bg-transparent": createLoading,
                    //   "bg-secondary": !createLoading,
                    // }
                  )}
                >
                  {/* {createLoading ? (
                    <div className="w-full h-full border-none flex items-center justify-center">
                      <VscLoading color="black" className="animate-spin" />
                    </div>
                  ) : (
                    "Register"
                  )} */}
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginCard;
