/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile, updateProfileData } from "../services/index/users";
import MainLayout from "../components/MainLayout";
import ProfilePicture from "../components/ProfilePicture";
import { userAction } from "../store/reducers/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // get user profile data
  const { data: userData, isPending: profilePending } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  // update user profile data
  const { mutate } = useMutation({
    mutationFn: (data) => {
      return updateProfileData({
        userData: data,
        token: userState.userInfo.token,
      });
    },
    onSuccess: (data) => {
      dispatch(userAction.setUserInfo(data.data));
      localStorage.setItem("account", JSON.stringify(data.data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profilePending ? "" : userData?.name,
      email: profilePending ? "" : userData?.email,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    mutate(data);
  };

  return (
    <MainLayout>
      <section className="  container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto  ">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Welcome Back - <span className="uppercase">{userData?.name}</span>
          </h1>
          <ProfilePicture avatar={userData?.avatar} />
          <form className="mt-4" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold text-sm block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 4,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-5 py-2 font-semibold block outline-none border   ${
                  errors.name ? "border-red-500" : "border-gray-400"
                } `}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.name?.message}
                </p>
              )}
            </div>
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
                type="text"
                id="password"
                {...register("password", {
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

            {profilePending ? (
              <button className="bg-red-500 text-white font-semibold text-lg py-2 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed">
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isValid}
                className="bg-primary text-white font-semibold text-lg py-2 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Update
              </button>
            )}
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
