// File: AlbumManager.jsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utils/axios";

const AlbumManager = () => {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all albums
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/albums");
      setAlbums(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch albums:", error);
      setErrorMessage("Error fetching albums. Please try again.");
      setLoading(false);
    }
  };

  // Create a new album
  const createAlbum = async (e) => {
    e.preventDefault();
    const albumData = { title, release_date: releaseDate };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/albums", albumData);
      if (response.status === 201) {
        setSuccessMessage("Album created successfully!");
        setTitle("");
        setReleaseDate("");
        fetchAlbums(); // Refresh the album list
      }
    } catch (error) {
      console.error("Failed to create album:", error);
      setErrorMessage("Error creating album. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch albums on component mount
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800">Album Manager</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 mt-4 rounded">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 mt-4 rounded">
          <p>{errorMessage}</p>
        </div>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-Teal text-white px-4 py-2 rounded m-4 hover:bg-green-700"
      >
       New Album
      </button>
      {/* Create Album Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Album</h2>
      <form onSubmit={createAlbum} className="mt-6">
        <div className="mb-4">
          <label className="block text-gray-700">Album Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter album title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Release Date</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <Icon icon="svg-spinners:90-ring-with-bg" className="mr-2" />
              Creating...
            </span>
          ) : (
            "Create Album"
          )}
        </button>
      </form>
      </div>
        </div>
      )}
      {/* Album List */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800">Albums</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {albums.map((album) => (
    <li
      key={album.album_id}
      className="p-4 rounded bg-gray-100 shadow-lg"
    >
      <a href="#" className="group relative block h-64 sm:h-80 lg:h-96">
        <span className="absolute inset-0 border-2 border-dashed border-black"></span>

        <div
          className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
        >
          <div
            className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
          >
           <Icon icon="bxs:album" width="24" height="24" />

            <h2 className="mt-4 text-xl font-medium sm:text-2xl">{album.title}</h2>
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">{album.total_songs} Songs</h2>
          </div>

          <div
            className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
          >
            <h3 className="mt-4 text-xl font-medium sm:text-2xl">{album.title}</h3>
            <h2 className="mt-4 text-xl font-medium sm:text-2xl">{album.total_songs} Songs</h2>

            <p className="mt-4 text-sm sm:text-base">
              Release Date: {new Date(album.release_date).toDateString()}
            </p>

            <p className="mt-8 font-bold">Created By: {album.created_by}</p>
          </div>
        </div>
      </a>
    </li>
  ))}
</ul>

        )}
      </div>
    </div>
  );
};

export default AlbumManager;
