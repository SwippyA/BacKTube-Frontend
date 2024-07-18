import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function History() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      const videos = [];
      const fetchedIds = new Set();
      for (let i = 0; i < user.watchHistory.length; i++) {
        const id = user.watchHistory[i];
        if (!fetchedIds.has(id)) {
          try {
            const response = await axios.get(
              `http://localhost:8000/api/v1/videos/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            videos.push(response.data.data);
            fetchedIds.add(id);
          } catch (error) {
            toast.error(error.message);
          }
        }
      }
      setVideoData(videos);
      setLoading(false);
    };

    fetchWatchHistory();
  }, [user.watchHistory, accessToken]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="text-white bg-black px-4 pt-4 text-4xl font-semibold">
        History
      </div>
      <hr />
      <div className="w-full h-fit bg-black flex flex-wrap gap-7 p-4">
        {loading ? (
          <div className="text-white text-2xl">Loading...</div>
        ) : (
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
                <img
                  src={video.owner.avatar}
                  alt=""
                  className="w-[40px] h-[40px] cursor-pointer rounded-full"
                />
                <h1 className="text-lg w-fit font-semibold text-white">
                  {video.title}
                </h1>
              </div>
              <div className="text-white flex flex-col justify-center px-[52px]">
                <h1 className="text-sm w-fit font-semibold hover:text-purple-700 cursor-pointer">
                  {video.owner.username}
                </h1>
                <div className="flex gap-2">
                  <p className="text-gray-400 text-sm">Views: 1</p>
                  <p className="text-gray-400 text-sm">
                    Date: {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default History;
