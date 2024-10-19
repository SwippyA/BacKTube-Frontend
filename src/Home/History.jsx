import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from '../Utilty/Loading'; // Import the Loading component
import Header from "../Header/Header";

function History() {
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.auth
  );

  // const [videoData, setVideoData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchWatchHistory = async () => {
  //     const videos = [];
  //     const fetchedIds = new Set();

  //     // Filter out invalid IDs
  //     const validWatchHistory = user.watchHistory;
  //     console.log(validWatchHistory);

  //     for (let i = 0; i < validWatchHistory.length; i++) {
  //       const id = validWatchHistory[i];
  //       if (!fetchedIds.has(id)) {
  //         try {
  //           const response = await axios.get(
  //             `http://localhost:8000/api/v1/videos/${id}`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${accessToken}`,
  //               },
  //             }
  //           );
  //           videos.push(response.data.data);
  //           fetchedIds.add(id);
  //         } catch (error) {
  //           toast.error(`Failed to load video with ID ${id}`);
  //         }
  //       }
  //     }
  //     setVideoData(videos);
  //     setLoading(false);
  //   };

  //   fetchWatchHistory();
  // }, [user.watchHistory, accessToken]);

  // const formatDuration = (duration) => {
  //   const minutes = Math.floor(duration / 60);
  //   const seconds = Math.floor(duration % 60);
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  return (
   <>
   <h1>This page is under Maintains</h1>
   
   </>
  );
}

export default History;
