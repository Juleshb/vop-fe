import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

const MusicCard = ({ album }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTrackList, setShowTrackList] = useState(false);

  const audioRef = useRef(null);

  const playTrack = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % album.tracks.length;
    setCurrentTrackIndex(newIndex);
  };

  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + album.tracks.length) % album.tracks.length;
    setCurrentTrackIndex(newIndex);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentTimeFormatted = formatTime(currentTime);
  const durationFormatted = formatTime(duration);

  return (
    <div className="max-w-xs rounded overflow-hidden m-2 shadow-lg">
      <img
        className="w-full cursor-pointer"
        src={album.cover}
        alt={album.title}
      />
      
        <div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-Teal mb-2">{album.title}</div>
            <p className="text-gray-700 text-base">
              {album.artist} - {album.year}
            </p>
            <p className="text-gray-700 text-base mt-2">Tracks: {album.tracks.length}</p>
          </div>
          <div className="px-6 py-4">
            {album.tracks.map((track, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {track}
              </span>
            ))}
          </div>
          <div className="px-6 py-4">
            <audio
              ref={audioRef}
              src={album.tracks[currentTrackIndex].audio}
              onTimeUpdate={handleTimeUpdate}
              onLoadedData={handleLoadedData}
            />
            <div className="text-center text-gray-700">
              {currentTimeFormatted} / {durationFormatted}
            </div>
            <div className="w-full bg-gray-200">
              <div
                className="bg-Teal"
                style={{ width: `${(currentTime / duration) * 100}%`, height: '4px' }}
              />
            </div>
            <div className="flex justify-center pt-4  text-Teal text-3xl ">
              <button onClick={prevTrack} className=" hover:bg-Teal hover:text-white mb-2 font-bold py-4 px-4 rounded-l">
              <Icon icon="gg:play-track-prev-o" />
              </button>
              {isPlaying ? (
                <button onClick={pauseTrack} className="hover:bg-Teal hover:text-white mb-2 font-bold py-4 px-4">
                 <Icon icon="carbon:pause-outline" />
                </button>
              ) : (
                <button onClick={playTrack} className="hover:bg-Teal hover:text-white mb-2 font-bold py-4 px-4">
                 <Icon icon="octicon:play-16" />
                </button>
              )}
              <button onClick={nextTrack} className="hover:bg-Teal hover:text-white mb-2 font-bold py-4 px-4 rounded-r">
              <Icon icon="teenyicons:next-circle-outline" />
              </button>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default MusicCard;
