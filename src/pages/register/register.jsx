import React from "react";
import { useForm } from "react-hook-form";
import { request } from "../../config/request";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    request
      .post("/register", data)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <form
        className="w-[600px] rounded-[20px] border-sky-800 border-[2px] p-[20px]"
        onSubmit={handleSubmit(submit)}
      >
        <input
          className="mb-[10px] border-[2px] rounded-[5px] p-[10px] w-full border-sky-500 outline-none"
          type="text"
          placeholder="name"
          {...register("name", { required: true })}
        />
        {errors.firstname && <span>First name is required</span>}
        <input
          className="mb-[10px] border-[2px] rounded-[5px] p-[10px] w-full border-sky-500 outline-none"
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <input
          className="mb-[10px] border-[2px] rounded-[5px] p-[10px] w-full border-sky-500 outline-none"
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}
        <button
          type="submit"
          className="bg-sky-700 rounded-[5px] p-[10px] w-full text-white font-bold text-[20px]"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
