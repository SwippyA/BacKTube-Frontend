import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../Utilty/Loading";
import Header from "../Header/Header";

function Subscription() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    // Fetch subscriptions data from API
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/Subscription/c/${user._id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setSubscriptions(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("NO  subscriptions found. ");
        console.error("Error fetching subscriptions:", error);
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSubscriptions();
    }
  }, [user._id, accessToken, isAuthenticated]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
    <Header />
    <div className="p-6 bg-gray-900 min-h-screen mt-10">
      <h1 className="text-5xl text-purple-600 font-bold mb-8 text-center">
        Your Subscriptions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {subscriptions.length > 0 ? (
          subscriptions.map((channel) => (
            <div
              key={channel.channelId}
              className="relative group bg-gradient-to-t from-purple-900 via-gray-800 to-gray-900 p-6 rounded-lg shadow-lg transform hover:rotate-2 hover:scale-105 transition-transform duration-500 ease-in-out"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50 group-hover:opacity-75 transition-opacity duration-300 rounded-lg"></div>
              <div className="relative flex flex-col items-center space-y-4">
                <Link to={`/user/${channel.channelId}`}>
                  <img
                    src={channel.avatar}
                    alt={`${channel.username} avatar`}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 hover:border-purple-300 transition-colors duration-300"
                  />
                </Link>
                <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                  {channel.username}
                </h2>
              </div>
              {channel.lastVideo && (
                <div className="mt-6">
                  <Link to={`/video/${channel.lastVideo._id}`}>
                    <img
                      src={channel.lastVideo.thumbnail}
                      alt={channel.lastVideo.title}
                      className="w-full h-48 object-cover rounded-md shadow-lg group-hover:opacity-90 transition-opacity duration-300"
                    />
                  </Link>
                  <h3 className="mt-4 text-lg font-semibold text-gray-300">
                    {channel.lastVideo.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {channel.lastVideo.views} views &middot;{" "}
                    {new Date(
                      channel.lastVideo.uploadDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-white">No subscriptions found.</div>
        )}
      </div>
    </div>
    </>
  );
}

export default Subscription;
