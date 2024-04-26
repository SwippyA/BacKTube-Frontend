import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
function Account() {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [data, setData] = useState({});
  const user = {
    _id: "662ba8227d671fd34a61aba3",
    username: "rocky222333",
    email: "dsfdsfds@43233",
    fullName: "Shubhankar Swain",
    avatar:
      "http://res.cloudinary.com/dm6jgzvnx/image/upload/v1714137135/t06vrb0lfpkurp7voepg.jpg",
    coverImage: "",
    watchHistory: [],
    createdAt: "2024-04-26T13:12:02.424Z",
    updatedAt: "2024-04-26T13:13:42.888Z",
    __v: 0,
  };
  const tokens =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJiYTgyMjdkNjcxZmQzNGE2MWFiYTMiLCJlbWFpbCI6ImRzZmRzZmRzQDQzMjMzIiwidXNlcm5hbWUiOiJyb2NreTIyMjMzMyIsImZ1bGxOYW1lIjoiU2h1YmhhbmthciBTd2FpbiIsImlhdCI6MTcxNDEzNzIyMiwiZXhwIjoxNzE0MjIzNjIyfQ.lNcAWrWVcMue3RF1cNl2-4CX1GqKbt8e7UFQKar6kws";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          }
        );
        setData(response.data.data);
        toast.success("get all channel  videos");
      } catch (error) {
        toast.error(error.message);
      } 
    };

    fetchData();
    // console.log(data);
  }, []);

  console.log(data);

  return (
    <>
      <div className="w-full h-fit flex flex-col bg-gray-950 p-6">
        <div>
          <div className="w-full h-fit p-6 flex  ml-5 gap-2">
            <img
              src="https://avatars.mds.yandex.net/i?id=b507a2b8d9382967a186c654f1eeaa74-5262078-images-taas-consumers&n=27&h=480&w=480"
              alt=""
              className=" rounded-full w-44 h-44 relative top-4 "
            />
            <div className=" flex flex-col p-10  gap-1 ">
              <h1 className="text-white text-5xl font-bold">{user.fullName}</h1>
              <p className="text-gray-500 text-sm">@{user.username}</p>
              <div className="flex gap-2">
                <p className="text-gray-500 text-sm">
                  Subscriber : {data.data || 0}
                </p>
                <p className="text-gray-500 text-sm">
                  Total Video: {data.data || 0}
                </p>
              </div>
              <div className="flex gap-4">
                {" "}
                <button className=" text-white text-sm px-7 py-2 rounded-2xl  mt-1 font-semibold bg-gray-800 hover:bg-purple-700 duration-200">
                  Edit Your Profile{" "}
                </button>
                <button className=" text-white text-sm px-7 py-2 rounded-2xl duration-200 hover:bg-purple-700 mt-1 font-semibold bg-gray-800">
                  {" "}
                  Upload Video
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <h1 className="text-white text-lg font-bold">Videos:</h1>
          <hr />
          <div className="w-full h-fit flex flex-wrap gap-7 p-4">
            <div className=" p-3  relative ">
              <Link to={"login"}>
                <img
                  src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713744000&semt=sph"
                  alt=""
                  className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
                />
              </Link>
              <span className=" bg-black rounded-md text-white text-sm px-1 py-0.5   absolute bottom-[70px] right-5">
                0.02
              </span>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg"
                  alt=""
                  className="w-[40px] h-[40px]  cursor-pointer rounded-full"
                />
                <h1 className="text-lg w-fit font-semibold text-white">hi</h1>
              </div>
              <div className="text-white flex flex-col justify-center px-[52px]">
                <h1 className="text-sm w-fit font-semibold hover:text-purple-700 cursor-pointer">
                  SwippYS
                </h1>
                <div className="flex gap-2">
                  <p className="text-gray-400 text-sm"> Views </p>
                  <p className="text-gray-400 text-sm">Date:</p>
                </div>
              </div>
            </div>
            <div className=" p-3  relative ">
              <Link to={"login"}>
                <img
                  src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713744000&semt=sph"
                  alt=""
                  className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
                />
              </Link>
              <span className=" bg-black rounded-md text-white text-sm px-1 py-0.5   absolute bottom-[70px] right-5">
                0.02
              </span>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg"
                  alt=""
                  className="w-[40px] h-[40px]  cursor-pointer rounded-full"
                />
                <h1 className="text-lg w-fit font-semibold text-white">hi</h1>
              </div>
              <div className="text-white flex flex-col justify-center px-[52px]">
                <h1 className="text-sm w-fit font-semibold hover:text-purple-700 cursor-pointer">
                  SwippYS
                </h1>
                <div className="flex gap-2">
                  <p className="text-gray-400 text-sm"> Views </p>
                  <p className="text-gray-400 text-sm">Date:</p>
                </div>
              </div>
            </div>
            <div className=" p-3  relative ">
              <Link to={"login"}>
                <img
                  src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713744000&semt=sph"
                  alt=""
                  className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
                />
              </Link>
              <span className=" bg-black rounded-md text-white text-sm px-1 py-0.5   absolute bottom-[70px] right-5">
                0.02
              </span>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg"
                  alt=""
                  className="w-[40px] h-[40px]  cursor-pointer rounded-full"
                />
                <h1 className="text-lg w-fit font-semibold text-white">hi</h1>
              </div>
              <div className="text-white flex flex-col justify-center px-[52px]">
                <h1 className="text-sm w-fit font-semibold hover:text-purple-700 cursor-pointer">
                  SwippYS
                </h1>
                <div className="flex gap-2">
                  <p className="text-gray-400 text-sm"> Views </p>
                  <p className="text-gray-400 text-sm">Date:</p>
                </div>
              </div>
            </div>
            <div className=" p-3  relative ">
              <Link to={"login"}>
                <img
                  src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713744000&semt=sph"
                  alt=""
                  className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
                />
              </Link>
              <span className=" bg-black rounded-md text-white text-sm px-1 py-0.5   absolute bottom-[70px] right-5">
                0.02
              </span>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg"
                  alt=""
                  className="w-[40px] h-[40px]  cursor-pointer rounded-full"
                />
                <h1 className="text-lg w-fit font-semibold text-white">hi</h1>
              </div>
              <div className="text-white flex flex-col justify-center px-[52px]">
                <h1 className="text-sm  w-fit font-semibold hover:text-purple-700 cursor-pointer">
                  SwippYS
                </h1>
                <div className="flex gap-2">
                  <p className="text-gray-400 text-sm"> Views </p>
                  <p className="text-gray-400 text-sm">Date:</p>
                </div>
              </div>
            </div>
            <div className=" p-3  relative ">
              <Link to={"login"}>
                <img
                  src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713744000&semt=sph"
                  alt=""
                  className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
                />
              </Link>
              <span className=" bg-black rounded-md text-white text-sm px-1 py-0.5   absolute bottom-[70px] right-5">
                0.02
              </span>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg"
                  alt=""
                  className="w-[40px] h-[40px]  cursor-pointer rounded-full"
                />
                <h1 className="text-lg w-fit font-semibold text-white">hi</h1>
              </div>
              <div className="text-white flex flex-col justify-center px-[52px]">
                <h1 className="text-sm  w-fit font-semibold hover:text-purple-700 cursor-pointer">
                  SwippYS
                </h1>
                <div className="flex gap-2">
                  <p className="text-gray-400 text-sm"> Views </p>
                  <p className="text-gray-400 text-sm">Date:</p>
                </div>
              </div>
            </div>
            <div className=" p-3  relative ">
              <Link to={"login"}>
                <img
                  src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713744000&semt=sph"
                  alt=""
                  className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
                />
              </Link>
              <span className=" bg-black rounded-md text-white text-sm px-1 py-0.5   absolute bottom-[70px] right-5">
                0.02
              </span>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/dd/97/3a/dd973ac116a977c8dd5296b0da504b8c.jpg"
                  alt=""
                  className="w-[40px] h-[40px]  cursor-pointer rounded-full"
                />
                <h1 className="text-lg w-fit font-semibold text-white">hi</h1>
              </div>
              <div className="text-white flex flex-col justify-center px-[52px]">
                <h1 className="text-sm w-fit font-semibold hover:text-purple-700 cursor-pointer">
                  SwippYS
                </h1>
                <div className="flex gap-2">
                  <p className="text-gray-400 text-sm"> Views </p>
                  <p className="text-gray-400 text-sm">Date:</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
