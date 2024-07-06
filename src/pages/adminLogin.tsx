// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import admiLoginSchema from "./adminLoginSchema.js";
// // import axios from "axios";
// // import { adminLoginTypes } from "../types/admiLoginTypes.js";
// import { useNavigate } from "react-router-dom";
// // import { useState } from "react";
// // import { resolve } from "path";

// const adminLogin = () => {
// //   const [responseError, setResponseError] = useState<string | null>("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },

//   } = useForm({ resolver: yupResolver(admiLoginSchema) });

// //   const onsubmit = async (data: adminLoginTypes) => {
// //     const adminData = {
// //       email: data.email,
// //       password: data.password,
// //     };
// //   };

//   const navigate = useNavigate();

//   return (
//     <div className="pt-10">
//       <h1
//         className="cursor-pointer text-center font-roboto font-medium"
//         onClick={() => navigate("/")}
//       >
//         eCommerce
//       </h1>

//       <div className="px-16 pt-16 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px] 3xl:px-[750px]">
//         <form
//         //   onSubmit={handleSubmit(onsubmit)}
//           className="mb-20 flex flex-col gap-4 border border-slate-400 px-5 py-5"
//         >
//           <h1 className="text-xl ">Sign in as admin</h1>

//           <div className="w-full ">
//             <div className="flex justify-between">
//               <label className="block text-sm" htmlFor="email">
//                 email
//               </label>
//             </div>
//             <input
//               className={`w-full border  ${errors.email ? ` border-red` : ` border-slate-400`}   outline-none`}
//               type="email"
//               id="email"
//               {...register("email")}
//               name="email"
//             />
//             {errors.email ? (
//               <div className="text-xs text-red">{errors.email.message}</div>
//             ) : null}
//           </div>
//           <div className="w-full">
//             <label className="block text-sm" htmlFor="password">
//               password
//             </label>
//             <input
//               className={`w-full border  ${errors.password ? ` border-red` : ` border-slate-400`}   outline-none`}
//               type="password"
//               id="password"
//               {...register("password")}
//               name="password"
//             />
//             {errors.password ? (
//               <div className="text-xs text-red">{errors.password.message}</div>
//             ) : null}
//           </div>

//           <button className=" w-full rounded-xl bg-slate-300 px-5 py-2  text-sm hover:bg-slate-400">
//             Submit
//           </button>
//         </form>
//       </div>

//       <div className="">
//         <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
//       </div>
//     </div>
//   );
// };

// export default adminLogin;
