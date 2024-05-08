import { useForm } from "react-hook-form";
import { registratioTypes } from "../types/registrationTypes.js";
import { yupResolver } from "@hookform/resolvers/yup";
import RegistrationSchema from "./RegistrationSchema.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const Registration = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(RegistrationSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: registratioTypes) => {
    const url = "http://localhost:3000/api/register";

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
    };

    try {
      const response = await axios.post(url, userData);

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  navigate("/login");

  return (
    <div>
      <div className=" px-16 pt-28 lg:px-60 xl:px-[600px] ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-5 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Create account</h1>
          <div className="w-full ">
            <label className="block text-sm " htmlFor="name">
              Your name
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="text"
              id="name"
              {...register("name")}
              name="name"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm" htmlFor="email">
              email
            </label>
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
          <div className="w-full">
            <label className="block text-sm " htmlFor="confirm-password">
              Repeat Password
            </label>
            <input
              className="w-full border border-slate-400  outline-green-300 "
              type="password"
              id="confirm-password"
              {...register("repeatPassword")}
              name="repeatPassword"
            />
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
