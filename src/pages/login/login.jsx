import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { request } from "../../config/request";
import { saveState } from "../../config/storage";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    request
      .post("/login", data)
      .then((res) => {
        saveState("user", res.data);
        navigate("/app", {
          replace: true,
        });
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
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}

        <input
          className="mb-[10px] border-[2px] rounded-[5px] p-[10px] w-full border-sky-500 outline-none"
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}

        <button
          type="submit"
          className="bg-sky-700 rounded-[5px] p-[10px] w-full text-white font-bold text-20px"
        >
          Login
        </button>
      </form>
      <p className="p-[20px] text-sky-300 text-center">
        If you don't have an account please{" "}
        <Link to="/register" className="text-sky-800">
          register
        </Link>
      </p>
    </div>
  );
};

export default Login;
