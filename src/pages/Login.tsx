import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./LoginSchema";
import axios from "axios";
import { loginTypes } from "../types/loginTypes.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// import { useDispatch } from "react-redux";
// import { setUserName } from "../store/userNameSlice.js";

const Login = () => {
  const [responseError, setResponseError] = useState(null);
  const [frontEndErrors, setFrontEndErrors] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  // const dispatch = useDispatch();

  useEffect(() => {
    setFrontEndErrors(errors.email?.message || errors.password?.message || "");
  }, [errors]);

  console.log("errors", frontEndErrors);

  let url;
  if (process.env.NODE_ENV === "production") {
    // Use production backend URL
    url = `https://ecommerceapi-production-7d9c.up.railway.app`;
  } else {
    // Use local backend URL
    url = `http://localhost:3000`;
  }

  const onSubmit = async (data: loginTypes) => {
    console.log("data", data);
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${url}/api/login`, userData);
      navigate("/");
      reset();
      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("data.email", data.email);
      localStorage.setItem("userName", response.data.name);
    } catch (error: any) {
      // console.log(error.response.data.message);
      setResponseError(error.response.data);
    }
  };
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="pt-10">
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-center font-roboto font-medium"
      >
        eCommerce
      </h1>
      <div className="flex h-16 items-center justify-center font-roboto text-red ">
        {responseError ? (
          <h1 className=" ">{responseError}</h1>
        ) : (
          frontEndErrors && <h1 className="">{frontEndErrors}</h1>
        )}
      </div>

      <div className="px-16 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px] 3xl:px-[750px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-4 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Sign in</h1>

          <div className="w-full ">
            <div className="flex justify-between">
              <label className="block text-sm" htmlFor="email">
                email
              </label>
            </div>
            <input
              className="w-full border  border-slate-400  outline-green-300  "
              type="email"
              id="email"
              {...register("email")}
              name="email"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm" htmlFor="password">
              password
            </label>
            <input
              className="w-full border  border-slate-400   outline-green-300 "
              type="password"
              id="password"
              {...register("password")}
              name="password"
            />
          </div>

          <button className=" w-full rounded-xl bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400">
            Submit
          </button>
        </form>
      </div>
      <div className="px-16 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[580px] 3xl:px-[750px]">
        <button
          onClick={() => handleClick("/registration")}
          className="mb-10 w-full rounded-xl bg-gradient-to-r from-transparent via-slate-200  to-transparent px-5 py-2  text-sm hover:via-slate-300"
        >
          Create your account
        </button>
      </div>

      <div className="">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default Login;
