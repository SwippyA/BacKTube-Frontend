import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure you have axios installed
import toast from "react-hot-toast"; // Optional: for notifications
import { useSelector } from "react-redux";
import Header from "../Header/Header";

function UpdateVideo() {
  // State to store video details
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Extracting video ID from URL parameters
  const navigate = useNavigate(); // For navigation after submission

  // Fetch video details on component mount
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/videos/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { title, description } = response.data.data;
        setVideoDetails({ title, description, thumbnail: null }); // Set thumbnail to null for new uploads
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch video details.");
      }
    };
    fetchVideoDetails();
  }, [id, accessToken]);

  // Handle input change for title and description
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails({ ...videoDetails, [name]: value });
  };

  // Handle file input for thumbnail
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setVideoDetails({ ...videoDetails, thumbnail: file });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state before making a request

    const formData = new FormData();
    formData.append("title", videoDetails.title);
    formData.append("description", videoDetails.description);
    if (videoDetails.thumbnail) {
      formData.append("thumbnail", videoDetails.thumbnail);
    }

    try {
      // Update video data
      await axios.patch(
        `http://localhost:8000/api/v1/videos/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Video updated successfully!");
      setVideoDetails({
        title: "",
        description: "",
        thumbnail: null,
      });
      navigate('/account'); // Navigate after successful update
    } catch (error) {
      setError(error.message);
      toast.error("Failed to update video.");
    } finally {
      setLoading(false); // Set loading state to false once done
    }
  };

  return (
    <>
    <Header />
    <div className="bg-black w-full h-screen flex  mt-9 items-center justify-center ">
      <div className="max-w-2xl w-full p-5 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">Update Video</h1>
        {loading && (
          <div className="text-white text-lg mb-4">Loading...</div> // Show loading state
        )}
        {error && (
          <div className="text-red-500 mb-4">{error}</div> // Show error state
        )}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
              Video Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={videoDetails.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
              Video Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={videoDetails.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter video description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Thumbnail Input */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="thumbnail">
              Video Thumbnail*
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="block w-full text-sm text-gray-300 border border-gray-600 rounded-md cursor-pointer bg-gray-800"
              required
            />
            {videoDetails.thumbnail && (
              <div className="mt-3">
                <p className="text-sm text-gray-400">Thumbnail Preview:</p>
                <img
                  src={URL.createObjectURL(videoDetails.thumbnail)}
                  alt="Thumbnail Preview"
                  className="mt-2 w-64 h-36 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-800"
              disabled={loading} // Disable button while loading
            >
              Update Video
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default UpdateVideo;
