import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axios";
import { Icon } from "@iconify/react";
import CoverImage from "../../../assets/Ntwari.jpg"

const BACKEND_BASE_URL = "http://localhost:4500/";
const BACKEND_BASE_URL_IMAGE = "http://localhost:4500";

const AlbumPlaylists = () => {
  const [albums, setAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axiosInstance.get("/albums/albums");
        setAlbums(response.data);
      } catch (error) {
        setErrorMessage("Error fetching albums. Please try again.");
      }
    };

    fetchAlbums();
  }, []);

  if (errorMessage) {
    return <div className="text-red-500 text-center mt-10">{errorMessage}</div>;
  }

  if (!albums.length) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <AlbumPlaylist key={album.album_id} album={album} />
        ))}
      </div>
    </div>
  );
};

const AlbumPlaylist = ({ album }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const playTrack = () => {
    if (!currentTrack) return;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    if (!currentTrack) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (album.songs.length === 0) return;
    const newTrackIndex = (currentTrackIndex + 1) % album.songs.length;
    setCurrentTrackIndex(newTrackIndex);
    setIsPlaying(true); // Auto-play next track
  };

  const prevTrack = () => {
    if (album.songs.length === 0) return;
    const newTrackIndex =
      (currentTrackIndex - 1 + album.songs.length) % album.songs.length;
    setCurrentTrackIndex(newTrackIndex);
    setIsPlaying(true); // Auto-play previous track
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentTrack = album.songs[currentTrackIndex];

  return (
    <div className="p-4 rounded shadow-lg bg-white">
      <img
        className="w-full h-40 object-cover rounded cursor-pointer"
        src={
        album.image_path
          ? `${BACKEND_BASE_URL_IMAGE}${album.image_path}` // Use image path if available
          : CoverImage // Use imported CoverImage as default
      }
        alt={album.title}
      />
      <h3 className="mt-2 text-lg font-bold text-gray-700">{album.title}</h3>
      <p className="text-gray-600">
        {album.created_by} - {new Date(album.release_date).toDateString()}
      </p>
      <p className="text-gray-600 mt-1">
        Tracks: {album.songs.length}
      </p>

      {album.songs.length > 0 ? (
        <>
          <div className="mt-4">
            <audio
              ref={audioRef}
              src={`${BACKEND_BASE_URL}${currentTrack?.file_path || ""}`}
              onTimeUpdate={handleTimeUpdate}
              onLoadedData={handleLoadedData}
              onEnded={nextTrack}
            />
            <div className="text-center text-gray-600">
              Now Playing: {currentTrack?.title || "No Track Selected"}
            </div>
            <div className="text-center text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <div className="w-full bg-gray-200 mt-2">
              <div
                className="bg-teal"
                style={{
                  width: `${(currentTime / duration) * 100 || 0}%`,
                  height: "4px",
                }}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={prevTrack}
              className="p-2 mx-2 bg-teal text-white rounded hover:bg-teal-600"
            >
              <Icon icon="gg:play-track-prev-o" />
            </button>
            {isPlaying ? (
              <button
                onClick={pauseTrack}
                className="p-2 mx-2 bg-teal text-white rounded hover:bg-teal-600"
              >
                <Icon icon="carbon:pause-outline" />
              </button>
            ) : (
              <button
                onClick={playTrack}
                className="p-2 mx-2 bg-teal text-white rounded hover:bg-teal-600"
              >
                <Icon icon="octicon:play-16" />
              </button>
            )}
            <button
              onClick={nextTrack}
              className="p-2 mx-2 bg-teal text-white rounded hover:bg-teal-600"
            >
              <Icon icon="teenyicons:next-circle-outline" />
            </button>
          </div>
        </>
      ) : (
        <div className="mt-4 text-center text-gray-500">
          No tracks available for this album.
        </div>
      )}
    </div>
  );
};

export default AlbumPlaylists;
