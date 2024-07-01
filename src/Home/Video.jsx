import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";

function Video() {
  const [video, setVideo] = React.useState({});
  const [Comments, setComments] = React.useState([]);
  const [owner, setOwner] = React.useState({});
  const [isLiked, setIsLike] = React.useState(false);
  const [isLiked_comment, setIsLike_comment] = React.useState(false);
  const [issubscribe, setissubscribe] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const [comment, setComment] = React.useState({});
  const [channelVideo, setChannelVideo] = React.useState({});
  const { id } = useParams();
  const tokens = accessToken;
  if(!isAuthenticated) {
    navigate("/login");
    return null;
  }

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

    comments();
    videoData();
  }, [id]);
  const comments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/Comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      //   console.log(response.data.data);
      setComments(response.data.data);
      toast.success("Comments saved successfully for display");
    } catch (error) {
      toast.error(error.message);
    }
  };
  //
  // console.log(Comments[0]);
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
  const [commentText, setCommentText] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Call the API to submit the comment
      const response = await axios.post(
        `http://localhost:8000/api/v1/Comments/${id}`, // Example API endpoint
        {
          content: commentText, // Adjust accordingly based on your API requirements
          // Include any other necessary data for the comment
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );

      // Handle the response, such as showing a success message
      console.log(response.data.data);
      toast.success("Comment submitted successfully ");
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error("Error submitting comment:", error.message);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row lg:p-0 h-auto p-7 gap-2 bg-black">
        <div className="w-full lg:w-3/5  lg:gap-1  mt-8 p-5 flex flex-col gap-3 ">
          <div className="flex w-full h-[200px] bg-gray-900 rounded-2xl overflow-hidden shadow-purple-500 shadow-md      lg:h-[400px]">
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
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center w-full">
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
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors duration-300"
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
                    fillRule="evenodd"
                    d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                    clipRule="evenodd"
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
          </div>

          <div className=" bg-gray-700 text-white font-semibold mt-4 rounded-lg p-2">
            <p>view : {video.views}</p>
            <p>Date: {new Date(video.createdAt).toLocaleDateString()}</p>
            {video.description}
          </div>
          <div className="text-white flex flex-col  gap-1">
            <h1 className="text-xl m-3 font-bold ">Comments</h1>
            <hr />
            <form onSubmit={handleSubmit} className="flex items-center gap-1">
              <img
                src={owner.avatar}
                alt=""
                className="w-10 h-10 rounded-full lg:w-6 lg:h-6"
              />
              <input
                type="text"
                placeholder="Add Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md ml-2  md:ml-0 md:-mt-0 md:px-4 md:p-2"
              >
                Comment
              </button>
            </form>
            <div className="w-full h-fit p-2 bg-slate-800 rounded-lg mt-11">
              {Comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border-b-2 border-purple-600"
                >
                  <img
                    src={comment.owner.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full lg:w-6 lg:h-6"
                  />
                  <div className="flex flex-col   p-2 w-full">
                    <p className=" font-semibold  text-lg text-white">
                      {comment.owner.username}
                    </p>
                    <p className="text-white">{comment.content}</p>
                    <div className="flex gap-2">
                      <button
                        className="flex"
                        onClick={async () => {
                          try {
                            const response = await axios.post(
                              `http://localhost:8000/api/v1/Likes/toggle/c/${comment._id}`,
                              {}, // Empty data object as the second argument
                              {
                                headers: {
                                  Authorization: `Bearer ${tokens}`,
                                },
                              }
                            );
                            toast.success(response.data.message);
                            setIsLike_comment(!isLiked_comment);
                            // console.log(response.data.data)
                          } catch (error) {
                            toast.error(error.message);
                          }
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
                            d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          toast.success("disliked");
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
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-white w-full lg:w-2/5 p-2 mt-8 bg-slate-950 rounded-md ">
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
