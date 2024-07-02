import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function History() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const videos = user.watchHistory;
  console.log(videos);

  return (
    <>
      <div className="w-full h-fit  bg-black flex flex-wrap gap-7 p-4 ">
      
        {videos.map((video) => (
          <div key={video} className="p-3 relative">
            <Link to={`/video/${video}`}>
              <img
                src="https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-imag-of-heart-in-the-blue-sky-against-a-background-of-white-clouds.jpg"
                alt=""
                className="w-full md:w-[350px] h-[190px] hover:shadow-lg hover:shadow-purple-700 rounded-lg mb-3 cursor-pointer"
              />
            </Link>
            <span className="bg-black rounded-md text-white text-sm px-1 py-0.5 absolute bottom-[70px] right-5">
              {formatDuration(video)}
            </span>
            <div className="flex items-center gap-3">
              <img
                src="https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-imag-of-heart-in-the-blue-sky-against-a-background-of-white-clouds.jpg"
                alt=""
                className="w-[40px] h-[40px] cursor-pointer rounded-full"
              />
              <h1 className="text-lg w-fit font-semibold text-white">video</h1>
            </div>
            <div className="text-white flex flex-col justify-center px-[52px]">
              <h1 className="text-sm w-fit font-semibold hover:text-purple-700 cursor-pointer">
                hi
              </h1>
              <div className="flex gap-2">
                <p className="text-gray-400 text-sm">Views: 1</p>
                <p className="text-gray-400 text-sm">
                  Date: {new Date(video).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default History;
