import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

function Account() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const [openMenuId, setOpenMenuId] = useState(null);
  const [data, setData] = useState({});
  const [videoData, setVideoData] = useState([]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Toggle menu visibility
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/videos/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("Deleted video successfully");
      setVideoData((prevVideos) => prevVideos.filter((video) => video._id !== id)); // Remove deleted video from state
    } catch (error) {
      toast.error(error.message || "Failed to delete video");
    }
  };

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
        toast.error(error.message || "Failed to fetch channel stats");
      }
    };

    const getUserVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/videos/",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setVideoData(response.data.data);
        toast.success("Fetched all channel videos successfully");
      } catch (error) {
        toast.error(error.message || "Failed to fetch videos");
      }
    };

    fetchData();
    getUserVideos();
  }, [isAuthenticated, accessToken]);

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
              Subscriber: {data?.TotalSubscribers || 0}
            </p>
            <p className="text-gray-500 text-sm">
              Total Videos: {data?.TotalVideos || 0}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to={"/editProfile"}
              className="text-white text-sm px-7 py-2 rounded-2xl font-semibold bg-gray-800 hover:bg-purple-700 duration-200"
            >
              Edit Your Profile
            </Link>
            <Link
              to={"/upload_video"}
              className="text-white text-sm px-7 py-2 rounded-2xl duration-200 hover:bg-purple-700 font-semibold bg-gray-800"
            >
              Upload Video
            </Link>
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
                <div className="relative top-1 ">
                  <button
                    onClick={() => toggleMenu(video._id)}
                    className="text-white absolute right-0 top-2 p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      />
                    </svg>
                  </button>

                  {openMenuId === video._id && (
                    <div className="absolute right-0 mt-8 w-48 bg-purple-700 rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        {video.owner._id === user._id ? (
                          <>
                            <li>
                              <Link
                                to={`/update_video/${video._id}`}
                                className="block px-4 py-2 text-sm text-white font-semibold hover:bg-gray-100 hover:text-black w-full text-left"
                                onClick={() => {
                                  console.log("Edit option clicked for", video._id);
                                }}
                              >
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                className="block px-4 py-2 text-sm text-white font-semibold hover:bg-gray-100 hover:text-black w-full text-left"
                                onClick={() => deleteVideo(video._id)} // Pass the function reference
                              >
                                Delete
                              </button>
                            </li>
                          </>
                        ) : null}

                        <li>
                          <button
                            className="block px-4 py-2 text-sm text-white font-semibold hover:bg-gray-100 hover:text-black w-full text-left"
                            onClick={() => {
                              console.log("Share option clicked for", video._id);
                            }}
                          >
                            Share
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
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
