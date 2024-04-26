import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";

function Video() {
  const [video, setVideo] = React.useState({});
  const [owner, setOwner] = React.useState({});
  const [isLiked, setIsLike] = React.useState(false);
  const [issubscribe, setissubscribe] = React.useState(false);
  const navigate = useNavigate();

  const [comment, setComment] = React.useState({});
  const [channelVideo, setChannelVideo] = React.useState({});
  const { id } = useParams();
  const tokens =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJiYTgyMjdkNjcxZmQzNGE2MWFiYTMiLCJlbWFpbCI6ImRzZmRzZmRzQDQzMjMzIiwidXNlcm5hbWUiOiJyb2NreTIyMjMzMyIsImZ1bGxOYW1lIjoiU2h1YmhhbmthciBTd2FpbiIsImlhdCI6MTcxNDEzNzIyMiwiZXhwIjoxNzE0MjIzNjIyfQ.lNcAWrWVcMue3RF1cNl2-4CX1GqKbt8e7UFQKar6kws";

  React.useEffect(() => {
    const videoData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/videos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          }
        );
        //   console.log(response.data.data);
        setVideo(response.data.data);
        setOwner(response.data.data.owner);
        toast.success("Video saved successfully for display");
      } catch (error) {
        toast.error(error.message);
      }
    };

    videoData();
  }, [id]);
  //
  //   console.log(video);
  const like_the_video = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/Likes/toggle/v/${id}`,
        null, // No data payload in this request
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      //   console.log(response.data.message);
      if (response.data.message == "Liked") {
        toast.success(response.data.message);
      }
      setIsLike(!isLiked);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const toggel_subscribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/Subscription/c/${owner._id}`,
        null, // No data payload in this request
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      //   console.log(response.data.message);
      toast.success(response.data.message);
      setissubscribe(!issubscribe);
      //   setIsLike(!isLiked);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row h-auto p-7 gap-2 bg-black">
        <div className="w-full lg:w-3/5 m-7 flex flex-col gap-3 ">
          <div className="flex w-full h-[450px] bg-gray-900 rounded-2xl overflow-hidden shadow-purple-500 shadow-md">
            <ReactPlayer
              playing={true}
              light={
                <img src={video.thumbnail} className="w-full h-full" alt="" />
              }
              url={video.videoFile}
              width="100%"
              height="100%"
              controls={true}
              style={{
                position: "relative",
                left: -0,
                borderRadius: 4,
              }}
            />
          </div>
          <h1 className="text-white font-bold text-2xl">{video.title}</h1>
          <div className="flex gap-1 items-center">
            
            <NavLink to={`/user/${owner._id}`}>
              <img
                src={owner.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </NavLink>

            <div className="text-white">
              <p className="font-bold text-md">{owner.username}</p>
              <p className="text-sm">{video.__v} Subscribers</p>
            </div>
            <button
              onClick={toggel_subscribe}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-auto"
            >
              {issubscribe ? "Unsubscribe" : "Subscribe"}
            </button>
            <button
              className="flex items-center text-white"
              onClick={like_the_video}
            >
              {isLiked ? (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                  />
                </svg>
              )}
              Like
            </button>
            <button
              className="flex items-center m-1 text-white"
              onClick={() => {
                toast.success("Video saved successfully for dislike.");
              }}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"
                />
              </svg>
              Dislike
            </button>

            {/* Add Dislike button or other buttons here */}
          </div>
          <div className=" bg-gray-700 text-white font-semibold mt-4 rounded-lg p-2">
            <p>view : {video.views}</p>
            <p>Date: {new Date(video.createdAt).toLocaleDateString()}</p>
            {video.description}
          </div>
          <div className="comments"></div>
        </div>
        <div className="text-white w-full lg:w-2/5 p-4 bg-slate-950 rounded-md">
          <div className="w-full h-auto flex gap-3 m-4">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/297/22/531/lake-blue-moonlight-moon-wallpaper-thumb.jpg"
              alt=""
              className="w-36 lg:w-[210px] h-full rounded-xl  cursor-pointer "
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-mm font-semibold lg:text-lg">
                Creating Custom Video Player with React Player
              </h1>
              <div>
                <div className="flex items-center">
                  <span className=" cursor-pointer hover:text-purple-700">
                    shubhankar swain
                  </span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">100K Views</span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">2 months ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex gap-3 m-4">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/297/22/531/lake-blue-moonlight-moon-wallpaper-thumb.jpg"
              alt=""
              className="w-36 lg:w-[210px] h-full rounded-xl  cursor-pointer "
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-mm font-semibold lg:text-lg">
                Creating Custom Video Player with React Player
              </h1>
              <div>
                <div className="flex items-center">
                  <span className=" cursor-pointer hover:text-purple-700">
                    shubhankar swain
                  </span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">100K Views</span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">2 months ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex gap-3 m-4">
            <img
              src="https://t3.ftcdn.net/jpg/05/71/06/76/360_F_571067620_JS5T5TkDtu3gf8Wqm78KoJRF1vobPvo6.jpg"
              alt=""
              className="w-36 lg:w-[210px] h-full rounded-xl  cursor-pointer "
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-mm font-semibold lg:text-lg">
                Creating Custom Video Player with React Player
              </h1>
              <div>
                <div className="flex items-center">
                  <span className=" cursor-pointer hover:text-purple-700">
                    shubhankar swain
                  </span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">100K Views</span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">2 months ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex gap-3 m-4">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/036/135/738/small_2x/ai-generated-colored-water-drops-on-abstract-background-water-drops-on-colorful-background-colored-wallpaper-ultra-hd-colorful-wallpaper-background-with-colored-bubbles-photo.jpg"
              alt=""
              className="w-36 lg:w-[210px] h-full rounded-xl  cursor-pointer "
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-mm font-semibold lg:text-lg">
                Creating Custom Video Player with React Player
              </h1>
              <div>
                <div className="flex items-center">
                  <span className=" cursor-pointer hover:text-purple-700">
                    shubhankar swain
                  </span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">100K Views</span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">2 months ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex gap-3 m-4">
            <img
              src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1792352125.1714089600&semt=ais"
              alt=""
              className="w-36 lg:w-[210px] h-full rounded-xl  cursor-pointer "
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-mm font-semibold lg:text-lg">
                Creating Custom Video Player with React Player
              </h1>
              <div>
                <div className="flex items-center">
                  <span className=" cursor-pointer hover:text-purple-700">
                    shubhankar swain
                  </span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">100K Views</span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">2 months ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
