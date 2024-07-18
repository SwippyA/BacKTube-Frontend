import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function User_Profile() {
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [videoData, setVideoData] = useState([]);
  const [user, setUserProfile] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login");
      return;
    }

    const fetchData = async (url, setState) => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setState(response.data.data);
        toast.success("Data fetched successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData(`http://localhost:8000/api/v1/dashboard/stats/${id}`, setData);
    fetchData(
      `http://localhost:8000/api/v1/dashboard/videos/${id}`,
      setVideoData
    );
    fetchData(
      `http://localhost:8000/api/v1/users/userGetById/${id}`,
      setUserProfile
    );
  }, [isAuthenticated, accessToken, id]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full h-fit flex flex-col bg-gray-950 p-6">
      <div className="w-full h-fit p-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="rounded-full w-44 h-44 md:w-60 md:h-60"
        />
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-white text-5xl font-bold">{user?.fullName}</h1>
            <p className="text-gray-500 text-sm">@{user?.username}</p>
          </div>
          <div className="flex gap-4">
            <p className="text-gray-500 text-sm">
              Subscribers: {data?.TotalSubscribers || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Videos: {data?.TotalVideos || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Views: {data?.TotalViews || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Likes: {data?.TotalLikes || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-fit flex flex-col gap-2">
        <h1 className="text-white text-lg font-bold">Videos:</h1>
        <hr />
        <div className="w-full h-fit flex flex-wrap gap-7 p-4">
          {videoData.length > 0 ? (
            videoData.map((video) => (
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
                  <Link to={`/user/${video.owner}`}>
                    <img
                      src={user.avatar}
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
                    {user.username}
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

export default User_Profile;
