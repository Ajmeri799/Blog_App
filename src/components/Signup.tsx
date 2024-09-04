import React, { useState } from "react";
import authService from "../apwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SignupFormInputs>();

  const create: SubmitHandler<SignupFormInputs> = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center font-bold bg-teal-950">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 my-5 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center text-black">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full Name is required",
              })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button type="submit" className="w-full bg-orange-600">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
