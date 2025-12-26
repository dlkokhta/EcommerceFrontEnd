import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordRecoverySchema from "./PasswordRecoverySchema";
import axios from "axios";
import { passwordRecoveryTypes } from "../types/passwordRecoveryTypes.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PasswordRecoveryPage = () => {
  const [responseError, setResponseError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(PasswordRecoverySchema),
  });

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://api.shop.dimitrikokhtashvili.com/api`;
  } else {
    url = `http://localhost:3000`;
  }
  const navigate = useNavigate();

  const onSubmit = async (data: passwordRecoveryTypes) => {
    try {
      await axios.post(`${url}/api/GenerateOTP`, {
        email: data.email,
      }, {
        withCredentials: true,
      });

      navigate("/OTP");

      reset();
    } catch (error: any) {
      setResponseError(error.response.data.message);
    }
  };
  return (
    <div className="pt-10">
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-center font-roboto font-medium"
      >
        eCommerce
      </h1>

      <div className="px-16 pt-16 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px] 3xl:px-[750px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 flex flex-col gap-3 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Password Recovery</h1>
          <span className="text-xs">
            Enter the email address associated with your account.
          </span>
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

          <button className=" w-full rounded-xl bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400">
            Submit
          </button>
        </form>
      </div>

      <div className="mt-40">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
