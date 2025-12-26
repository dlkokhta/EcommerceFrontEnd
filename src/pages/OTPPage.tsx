import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OTPSchema from "./OTPSchema";
import axios from "axios";
import { OTPTypes } from "../types/OTPTypes.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OTPPage = () => {
  const [responseError, setResponseError] = useState<string>("");
  console.log("responseError", responseError);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(OTPSchema),
  });

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `https://api.shop.dimitrikokhtashvili.com/api`;
  } else {
    url = `http://localhost:3000`;
  }
  const navigate = useNavigate();
  const onSubmit = async (data: OTPTypes) => {
    try {
      await axios.post(`${url}/api/recoverPassword`, {
        otp: data.otp,
      }, {
        withCredentials: true,
      });

      navigate("/login");
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
          <h1 className="text-xl ">Verification Required</h1>
          <span className="text-xs">
            To continue, complete this verification step. We've sent a One Time
            Password (OTP) to the email {} Please enter it below.
          </span>
          <h1 className="text-xs "></h1>
          <div className="w-full ">
            <div className="flex justify-between">
              <label className="block text-sm" htmlFor="otp">
                OTP
              </label>
            </div>
            <input
              className={`w-full border  ${errors.otp ? ` border-red` : ` border-slate-400`}   outline-none`}
              type="otp"
              id="otp"
              {...register("otp")}
              name="otp"
            />
            {errors.otp ? (
              <div className="text-xs text-red">{errors.otp.message}</div>
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

export default OTPPage;
