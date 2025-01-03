import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./LoginSchema";
import axios from "axios";
import { loginTypes } from "../types/loginTypes.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ handleGetCartItems }: any) => {
  const [responseError, setResponseError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://dimitrikokhtashvili.site`;
  } else {
    url = `http://localhost:3000`;
  }

  const onSubmit = async (data: loginTypes) => {
    //guest
    let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    const formattedCartItems = guestCart.map((item: any) => ({
      itemId: item.itemId,
      size: item.size,
      quantity: item.quantity,
    }));

    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${url}/api/login`, userData);

      if (response.data.role === "admin") {
        navigate("/adminPanel");
      } else {
        navigate("/");
      }

      reset();
      const authToken =
        response.data.role === "admin"
          ? response.data.adminToken
          : response.data.token;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("data.email", data.email);
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("role", response.data.role);

      //guest item to the cart during login
      await axios.post(
        `${url}/api/postCart`,
        {
          email: data.email,
          cartItems: formattedCartItems,
        },

        { headers: { Authorization: `Bearer ${token}` } },
      );
      localStorage.removeItem("guestCart");
      handleGetCartItems();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setResponseError(error.response.data.message);
      } else {
        setResponseError("An error occurred. Please try again.");
      }
    }
  };

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="pt-10 px-16 sm:px-40 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px] 3xl:px-[750px]  4xl:px-[790px]">
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-center font-roboto font-medium"
      >
        eCommerce
      </h1>

      <div className="pt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 flex flex-col gap-3 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Sign in</h1>
          <span className="text-xs"> Admins use your admin credentials</span>
          <h1 className="text-xs "></h1>
          <div className="w-full ">
            <div className="flex justify-between">
              <label className="block text-sm" htmlFor="email">
                email
              </label>
            </div>
            <input
              className={`w-full border  ${errors.email ? ` border-red` : ` border-slate-400`}   outline-none`}
              type="email"
              id="email"
              {...register("email")}
              name="email"
            />
            {errors.email ? (
              <div className="text-xs text-red">{errors.email.message}</div>
            ) : (
              responseError && (
                <div className="text-xs text-red">{responseError}</div>
              )
            )}
          </div>
          <div className="w-full">
            <div className="flex items-center">
              <label className="block text-sm" htmlFor="password">
                password
              </label>
              <label
                className="ml-auto block cursor-pointer text-xs text-sky-500 hover:text-red"
                htmlFor="password"
                onClick={() => navigate("/passwordRecovery")}
              >
                forgot your password?
              </label>
            </div>

            <input
              className={`w-full border  ${errors.password ? ` border-red` : ` border-slate-400`}   outline-none`}
              type="password"
              id="password"
              {...register("password")}
              name="password"
            />
            {errors.password && (
              <div className="text-xs text-red">{errors.password.message}</div>
            )}
          </div>

          <button className=" w-full rounded-xl bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400">
            Submit
          </button>
        </form>
      </div>

      <div className="">
        <button
          onClick={() => handleClick("/registration")}
          className="mb-5 w-full rounded-xl bg-gradient-to-r from-transparent via-slate-200  to-transparent px-5 py-2  text-sm hover:via-slate-300"
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
