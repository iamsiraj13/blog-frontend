/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signin } from "../services/index/users";
import MainLayout from "../components/MainLayout";
import { userAction } from "../store/reducers/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return signin(data);
    },
    onSuccess: (data) => {
      dispatch(userAction.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("Login Successfull");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    mutate(data);
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto  ">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Sign In
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-gray-400"
                } `}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] text-sm font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 characters",
                  },
                })}
                placeholder="Enter password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-5 py-2 font-semibold block outline-none border   ${
                  errors.password ? "border-red-500" : "border-gray-400"
                } `}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.password?.message}
                </p>
              )}
            </div>

            {isPending ? (
              <button className="bg-red-500 text-white font-semibold text-lg py-2 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed">
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isValid}
                className="bg-primary text-white font-semibold text-lg py-2 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Login
              </button>
            )}
            <p className="text-sm font-semibold text-[#5a7184]">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
