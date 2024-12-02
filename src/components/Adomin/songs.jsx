import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../utils/axios";
import { Icon } from "@iconify/react";

const SongManager = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [filterAlbum, setFilterAlbum] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayer = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BACKEND_BASE_URL = "http://localhost:4500/";

  // Fetch all songs
  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/songs");
      setSongs(response.data);
      setFilteredSongs(response.data);
    } catch (error) {
      setErrorMessage("Error fetching songs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all albums
  const fetchAlbums = async () => {
    try {
      const response = await axiosInstance.get("/albums");
      setAlbums(response.data);
    } catch (error) {
      setErrorMessage("Error fetching albums. Please try again.");
    }
  };

  // Upload a new song
  const uploadSong = async (e) => {
    e.preventDefault();
    if (!file || !title || !albumId) {
      setErrorMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("song", file);
    formData.append("title", title);
    formData.append("album_id", albumId);

    try {
      setLoading(true);
      const response = await axiosInstance.post("/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        setSuccessMessage("Song uploaded successfully!");
        setTitle("");
        setAlbumId("");
        setFile(null);
        fetchSongs(); // Refresh the song list
      }
    } catch (error) {
      setErrorMessage("Error uploading song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Play or pause a song
  const handlePlayPause = (index) => {
    if (currentSongIndex === index && !audioPlayer.current.paused) {
      audioPlayer.current.pause();
      setCurrentSongIndex(null);
    } else {
      setCurrentSongIndex(index);
    }
  };

  // Navigate to the next song
  const handleNext = () => {
    if (songs.length > 0) {
      setCurrentSongIndex((currentSongIndex + 1) % songs.length);
      setCurrentTime(0);
    }
  };

  // Navigate to the previous song
  const handlePrevious = () => {
    if (songs.length > 0) {
      setCurrentSongIndex(
        (currentSongIndex - 1 + songs.length) % songs.length
      );
      setCurrentTime(0);
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.current.currentTime);
  };

  // Handle audio metadata loading
  const handleLoadedMetadata = () => {
    setDuration(audioPlayer.current.duration);
  };

  // Seek to a specific time
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioPlayer.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterAndSortSongs(term, filterAlbum, sortOption);
  };

  // Sorting functionality
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    filterAndSortSongs(searchTerm, filterAlbum, option);
  };

  // Filter by album
  const handleFilterByAlbum = (e) => {
    const album = e.target.value;
    setFilterAlbum(album);
    filterAndSortSongs(searchTerm, album, sortOption);
  };

  // Filter and sort songs
  const filterAndSortSongs = (search, album, sort) => {
    let filtered = songs;

    if (album) {
      filtered = filtered.filter((song) => song.album_id === parseInt(album));
    }

    if (search) {
      filtered = filtered.filter((song) =>
        song.title.toLowerCase().includes(search)
      );
    }

    if (sort === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "duration") {
      filtered.sort((a, b) => a.duration - b.duration);
    }

    setFilteredSongs(filtered);
  };

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (currentSongIndex !== null) {
      const song = songs[currentSongIndex];
      audioPlayer.current.src = `${BACKEND_BASE_URL}${song.file_path}`;
      audioPlayer.current.play();
    }
  }, [currentSongIndex]);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Songs List</h1>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-Teal text-white px-4 py-2 rounded m-4 hover:bg-green-700"
      >
        Add Song
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Song</h2>
            <form onSubmit={uploadSong}>
              <div>
                <label className="block text-gray-700">Song Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Album</label>
                <select
                  value={albumId}
                  onChange={(e) => setAlbumId(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="">Select Album</option>
                  {albums.map((album) => (
                    <option key={album.album_id} value={album.album_id}>
                      {album.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Song File</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-4 py-2 border rounded"
                  accept="audio/*"
                  required
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-Teal text-white px-4 py-2 rounded hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload Song"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6">
  <input
    type="text"
    placeholder="Search by title..."
    value={searchTerm}
    onChange={handleSearch}
    className="w-full sm:w-1/2 md:w-1/3 px-4 py-2 border rounded"
  />
  <select
    value={sortOption}
    onChange={handleSort}
    className="w-full sm:w-auto px-4 py-2 border rounded"
  >
    <option value="title">Sort by Title</option>
    <option value="duration">Sort by Duration</option>
  </select>
  <select
    value={filterAlbum}
    onChange={handleFilterByAlbum}
    className="w-full sm:w-auto px-4 py-2 border rounded"
  >
    <option value="">All Albums</option>
    {albums.map((album) => (
      <option key={album.album_id} value={album.album_id}>
        {album.title}
      </option>
    ))}
  </select>
</div>

      <ul className="grid gap-4">
        {filteredSongs.map((song, index) => (
            <li
  key={song.song_id}
  className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col gap-4 sm:flex-row sm:items-center"
>
  {/* Song Info Section */}
  <a
    href="#"
    className="block flex-grow rounded-lg shadow-sm shadow-indigo-100 p-4"
  >
    <div>
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {song.title}
      </h3>
      <p className="text-sm text-gray-500 mt-1 truncate">
        Album: {song.album_title}
      </p>
      <p className="text-sm text-gray-500 mt-1">Duration: {song.duration}s</p>
    </div>
  </a>
 {/* Progress Bar */}
 {currentSongIndex === index && (
    <div className="w-full mt-4">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-Teal h-3 rounded-full transition-all"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60).toString().padStart(2, "0")}
        </span>
        <span>
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60).toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  )}
  {/* Control Buttons */}
  <div className="flex items-center gap-4 justify-between sm:justify-start sm:flex-row sm:gap-6">
   
    {/* Next/Previous Buttons */}
    {currentSongIndex === index && (
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"
        >
          <Icon icon="tdesign:previous-filled" width="20" height="20" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"
        >
          <Icon icon="ic:sharp-skip-next" width="20" height="20" />
        </button>
      </div>
    )}
     {/* Play/Pause Button */}
     <button
      onClick={() => handlePlayPause(index)}
      className={`p-2 rounded-full text-white ${
        currentSongIndex === index && !audioPlayer.current?.paused
          ? "bg-red-500 hover:bg-green-700"
          : "bg-Teal hover:bg-green-700"
      }`}
    >
      {currentSongIndex === index && !audioPlayer.current?.paused ? (
        <Icon icon="carbon:pause-outline" width="24" height="24" />
      ) : (
        <Icon icon="octicon:play-24" width="24" height="24" />
      )}
    </button>

  </div>

 
</li>


        ))}
      </ul>

      <audio
        ref={audioPlayer}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
};

export default SongManager;
