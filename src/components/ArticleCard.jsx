import { images } from "../contstant";
import { BsCheckLg } from "react-icons/bs";

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <img
        src={images.Post1Image}
        alt=""
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
      />

      <div className="p-5">
        <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
          Future Of blog
        </h2>
        <p className="text-dark-light mt-3 text-sm md:text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab harum
          aliquam repellat illo. Consequatur, voluptate.
        </p>

        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={images.PostProfileImage}
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                Sirajul
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  // className={`${
                  //   post.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                  // } w-fit bg-opacity-20 p-1.5 rounded-full`}
                  className={`bg-[#36B37E] w-fit bg-opacity-20 p-1.5 rounded-full`}
                >
                  <BsCheckLg className="w-4 h-4 text-[#36B37E]" />
                  {/* {
                    (post.user.verified  ? (
                      <BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
                    ) : (
                      <AiOutlineClose className="w-1.5 h-1.5 text-red-500" />
                    ))
                  } */}
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  {/* {post.user.verified ? "Verified" : "Unverified"} */}
                  Verified writer
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            {new Date().getDate()}{" "}
            {new Date().toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
