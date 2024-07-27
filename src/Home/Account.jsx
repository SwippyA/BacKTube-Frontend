import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

function Account() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const [data, setData] = useState({});
  const [Video_data, setVideo_data] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/dashboard/stats",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setData(response.data.data);
        toast.success("Fetched channel stats successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getUser_Videos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/videos/",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setVideo_data(response.data.data);
        toast.success("Fetched all channel videos successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
    getUser_Videos();
  }, [isAuthenticated, accessToken]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full h-fit flex flex-col bg-gray-950 p-6">
      <div className="w-full h-fit p-6 flex flex-col md:flex-row items-center justify-between gap-2"
     
      >
        <img
          src={user.avatar}
          alt=""
          className="rounded-full w-44 h-44 md:w-60 md:h-60"
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-col">
            <h1 className="text-white text-5xl font-bold">{user?.fullName}</h1>
            <p className="text-gray-500 text-sm">@{user?.username}</p>
          </div>
          <div className="flex gap-4">
            <p className="text-gray-500 text-sm">
              Subscriber: {data?.subscriberCount || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Videos: {data?.totalVideos || 0}
            </p>
          </div>
          <div className="flex gap-4">
            <Link to={"/editProfile"} className="text-white text-sm px-7 py-2 rounded-2xl font-semibold bg-gray-800 hover:bg-purple-700 duration-200">
              Edit Your Profile
            </Link>
            <Link to={"/upload_video"} className="text-white text-sm px-7 py-2 rounded-2xl duration-200 hover:bg-purple-700 font-semibold bg-gray-800">
              Upload Video
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-2">
        <h1 className="text-white text-lg font-bold">Videos:</h1>
        <hr />
        <div className="w-full h-fit flex flex-wrap gap-7 p-4">
          {Video_data.length > 0 ? (
            Video_data.map((video) => (
              <div key={video._id} className="p-3 relative">
                <Link to={`/video/${video._id}`}>
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
                  />
                </Link>
                <span className="bg-black rounded-md text-white text-sm px-1 py-0.5 absolute bottom-[70px] right-5">
                  {formatDuration(video.duration)}
                </span>
                <div className="flex items-center gap-3">
                  <Link to={`/user/${video.owner._id}`}>
                    <img
                      src={video.owner.avatar}
                      alt=""
                      className="w-[40px] h-[40px] cursor-pointer rounded-full"
                    />
                  </Link>

                  <h1 className="text-lg w-fit font-semibold text-white">
                    {video.title}
                  </h1>
                </div>
                <div className="text-white flex flex-col justify-center px-[52px]">
                  <h1 className="text-sm w-fit font-semibold hover:text-purple-700 cursor-pointer">
                    {video.owner.username}
                  </h1>
                  <div className="flex gap-2">
                    <p className="text-gray-400 text-sm">
                      Views: {video.views}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Date: {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No videos available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
