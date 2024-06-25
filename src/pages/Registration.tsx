import { useForm } from "react-hook-form";
import { registratioTypes } from "../types/registrationTypes.js";
import { yupResolver } from "@hookform/resolvers/yup";
import RegistrationSchema from "./RegistrationSchema.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Registration = () => {
  const [responseError, setResponseError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(RegistrationSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: registratioTypes) => {
    let url;
    if (process.env.NODE_ENV === "production") {
      url = `https://ecommerceapi-production-7d9c.up.railway.app`;
    } else {
      url = `http://localhost:3000`;
    }

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
    };

    try {
      await axios.post(`${url}/api/register`, userData);
      reset();
    } catch (error) {
      setResponseError(error.response.data);
      console.log("backendError", error);
    }
  };

  // navigate("/login");

  return (
    <div className="pt-10">
      <h1
        onClick={() => navigate("/")}
        className="block cursor-pointer text-center font-roboto font-medium"
      >
        eCommerce
      </h1>
      <div className="flex  h-16 items-center justify-center font-roboto text-red "></div>
      <div className=" px-16 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-4 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Create account</h1>
          <div className="w-full ">
            <label className="block text-sm " htmlFor="name">
              Your name
            </label>
            <input
              className={`w-full border  ${errors.name ? ` border-red` : ` border-slate-400`}   outline-none`}
              type="text"
              id="name"
              {...register("name")}
              name="name"
            />
            {errors.name && (
              <div className="text-xs text-red">{errors.name.message}</div>
            )}
          </div>

          <div className="w-full">
            <label className="block text-sm" htmlFor="email">
              email
            </label>
            <input
              className={`w-full border ${errors.email ? `border-red` : `border-slate-400 `}  outline-none`}
              type="email"
              id="email"
              {...register("email")}
              name="email"
            />
            {errors.email && (
              <div className="text-xs text-red">{errors.email.message}</div>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm" htmlFor="password">
              password
            </label>
            <input
              className={`w-full border ${errors.password ? `border-red` : `border-slate-400`} outline-none`}
              type="password"
              id="password"
              {...register("password")}
              name="password"
            />
            {errors.password && (
              <div className="text-xs text-red">{errors.password.message}</div>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm " htmlFor="confirm-password">
              Repeat Password
            </label>
            <input
              className={`w-full border ${errors.repeatPassword ? `border-red` : `border-slate-400`} outline-none`}
              type="password"
              id="confirm-password"
              {...register("repeatPassword")}
              name="repeatPassword"
            />
            {errors.repeatPassword && (
              <div className="text-xs text-red">
                {errors.repeatPassword.message}
              </div>
            )}
          </div>
          <button className=" w-full rounded-xl bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400">
            Submit
          </button>

          <div className="text-sm">
            have an account?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer text-blue-500 underline hover:text-red"
            >
              Sign in
            </a>
            <a
              onClick={() => {
                navigate("/");
              }}
              className="ml-3 cursor-pointer text-blue-500 underline hover:text-red"
            >
              Home
            </a>
          </div>
        </form>
      </div>
      <div className="">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default Registration;
