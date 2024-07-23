import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function UploadVideo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, video, thumbnail } = formData;

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("video", video);
    data.append("thumbnail", thumbnail);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/videos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Video uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        video: null,
        thumbnail: null,
      });
    } catch (error) {
      toast.error("Failed to upload video.");
    }
  };

  return (
    <div className="h-fit w-full flex flex-col justify-center items-center bg-gray-900 p-5">
      <h1 className="text-4xl p-3 text-white font-bold hover:text-purple-700">Upload Video</h1>
      <div className="w-full max-w-md bg-gray-800 p-5 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="video">
              Video (MP4, AVI, MOV)
            </label>
            <input
              type="file"
              id="video"
              name="video"
              accept=".mp4,.avi,.mov"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="thumbnail">
              Thumbnail (JPG, PNG, GIF)
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              Upload Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
