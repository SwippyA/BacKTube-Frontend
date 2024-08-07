import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";

function Video() {
  const [video, setVideo] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [owner, setOwner] = React.useState({});
  const [isLiked, setIsLiked] = React.useState(false);
  const [commentLikes, setCommentLikes] = React.useState({});
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [Channel_Videos, setChannel_Videos] = React.useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const [commentText, setCommentText] = React.useState("");
  const { id } = useParams();
  const tokens = accessToken;

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await axios.get(
          `http://localhost:8000/api/v1/videos/${id}`,
          {
            headers: { Authorization: `Bearer ${tokens}` },
          }
        );
        setVideo(videoResponse.data.data);
        setOwner(videoResponse.data.data.owner);

        const commentsResponse = await axios.get(
          `http://localhost:8000/api/v1/Comments/${id}`,
          {
            headers: { Authorization: `Bearer ${tokens}` },
          }
        );
        setComments(commentsResponse.data.data);

        toast.success("Video and comments fetched successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchChannelVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/all_Videos`,
          {
            headers: { Authorization: `Bearer ${tokens}` },
          }
        );
        setChannel_Videos(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const initialLikes = {};
    comments.forEach((comment) => {
      initialLikes[comment._id] = false; // Initialize all comments as not liked
    });
    setCommentLikes(initialLikes);

    fetchData();
    fetchChannelVideos();
  }, [id, tokens ]);

  user.watchHistory.push(video._id);

  const handleLikeClick = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/Likes/toggle/c/${commentId}`,
        null,
        {
          headers: { Authorization: `Bearer ${tokens}` },
        }
      );
      toast.success(response.data.message);
      setCommentLikes((prevLikes) => ({
        ...prevLikes,
        [commentId]: !prevLikes[commentId],
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLikeVideo = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/Likes/toggle/v/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${tokens}` },
        }
      );
      toast.success(response.data.message);
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleSubscribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/Subscription/c/${owner._id}`,
        null,
        {
          headers: { Authorization: `Bearer ${tokens}` },
        }
      );
      toast.success(response.data.message);
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/Comments/${id}`,
        { content: commentText },
        {
          headers: { Authorization: `Bearer ${tokens}` },
        }
      );
      toast.success("Comment submitted successfully");
      setComments((prevComments) => [...prevComments, response.data.data]);
    } catch (error) {
      toast.error("Error submitting comment:", error.message);
    }
  };

  return (
    <div className="w-full h-fit flex flex-col lg:flex-row lg:p-0  p-7 gap-2 bg-black">
      <div className="w-full lg:w-3/5 mt-8 p-5 flex flex-col gap-3">
        <div className="flex w-full h-[200px] bg-gray-900 rounded-2xl overflow-hidden shadow-purple-500 shadow-md lg:h-[400px]">
          <ReactPlayer
            playing
            light={
              <img src={video.thumbnail} className="w-full h-full" alt="" />
            }
            url={video.videoFile}
            width="100%"
            height="100%"
            controls
            style={{ position: "relative", left: 0, borderRadius: 4 }}
          />
        </div>
        <h1 className="text-white font-bold text-2xl">{video.title}</h1>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center w-full">
          <NavLink to={`/user/${owner._id}`}>
            <img src={owner.avatar} alt="" className="w-10 h-10 rounded-full" />
          </NavLink>
          <div className="text-white">
            <p className="font-bold text-md">{owner.username}</p>
            <p className="text-sm">{video.__v} Subscribers</p>
          </div>
          <button
            onClick={handleToggleSubscribe}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors duration-300"
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
          <button
            className="flex items-center text-white"
            onClick={handleLikeVideo}
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
                d="M17 13c-.89.086-1.416.543-2.156 1.057a22.323 22.323 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.6 1.6 0 0 1-.537-.406 1.64 1.64 0 0 1-.384-1.279l1.388-4.114M17 13h3v6.5A1.5 1.5 0 0 1 18.5 21v0A1.5 1.5 0 0 1 17 19.5V13Zm-6.5 1H5.585a1.248 1.248 0 0 0-.626-.15 1.25 1.25 0 0 0-.637.572 1.124 1.124 0 0 0-.215 1.673l2.098 6.4C6.462 21.52 6.632 22 7.88 22c2.303 0 4.79-.943 6.67-1.475"
              />
            </svg>
            Dislike
          </button>
        </div>
        <p className="text-gray-300 text-sm">{video.description}</p>
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col gap-4 my-3"
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full h-16 rounded-2xl p-3 bg-[#202020] text-white"
            placeholder="Add a comment..."
            required
          ></textarea>
          <button
            type="submit"
            className="bg-purple-600 text-white font-bold py-2 rounded-xl hover:bg-purple-700 transition-colors duration-300"
          >
            Comment
          </button>
        </form>
        {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex flex-col p-4 bg-[#202020] rounded-2xl my-2"
        >
          <div className="flex items-center gap-2">
            <img
              src={comment.owner.avatar}
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-white font-bold">{comment.owner.username}</p>
              <p className="text-gray-400 text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-white mt-2">{comment.content}</p>
          <button
            className="flex items-center text-gray-400 mt-1"
            onClick={() => handleLikeClick(comment._id)}
          >
            {commentLikes[comment._id] ? (
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
        </div>
      ))}

      </div>
      <div className="text-white w-fit lg:w-2/5 p-2 mt-8 bg-slate-950 rounded-md ">
        {Channel_Videos.map((video, index) => (
          <div key={index} className="w-fit h-auto flex gap-3 my-4 px-2">
            <Link to={`/video/${video._id}`}>
              <img
                src={video.thumbnail}
                alt=""
                className=" w-40 h-28 lg:w-[210px]  rounded-xl  cursor-pointer "
              />
            </Link>

            <div className="flex flex-col justify-between">
              <h1 className="text-mm font-semibold lg:text-lg">
                {video.title}
              </h1>
              <div>
                <div className="flex items-center">
                  <Link
                    to={`/user/${video.owner._id}`}
                    className=" cursor-pointer hover:text-purple-700"
                  >
                    {video.owner.username}
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">{video.views}</span>
                </div>
                <div className="flex items-center">
                  <span className=" text-gray-700 text-sm">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Video;
