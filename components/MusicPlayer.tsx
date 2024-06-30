import React, { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import { SongProps, useMusic } from "@/lib/context/music";
import Image from "next/image";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { FaPause, FaPlay } from "react-icons/fa";
import { getNextSongId, getPrevSongId } from "@/lib/utils";

export default function MusicPlayer() {

  const [
    { currentMusicId, isPlaying, songs },
    { setIsPlaying, setCurrentMusicId },
  ] = useMusic();
  const soundInstance = useRef<Howl | null>(null);
  const [currentMusic, setCurrentMusic] = useState<SongProps | null>(null);

  useEffect(() => {
    if (currentMusicId) {
      setCurrentMusic(songs.find(({ id }) => id === currentMusicId) || null);
    }
  }, [currentMusicId]);

  useEffect(() => {
    if (currentMusic) {
      soundInstance.current = new Howl({
        src: [currentMusic.file],
      });
      soundInstance.current.play();
      setIsPlaying(true);
    }

    return () => {
      // soundInstance.pause();
      if (soundInstance.current) {
        soundInstance.current.unload();
      }
    };
  }, [currentMusic]);

  function handlePlay() {
    console.log(soundInstance.current);

    if (!soundInstance.current) return null;
    soundInstance.current.play();
    setIsPlaying(true);
  }

  function handlePause() {
    if (!soundInstance.current) return null;
    console.log(soundInstance.current);
    soundInstance.current.pause();
    setIsPlaying(false);
  }

  function handleNext() {
    if (currentMusicId) {
      const nextSong = getNextSongId(songs, currentMusicId);
      setCurrentMusicId(nextSong);
    }
  }

  function handlePrev() {
    if (currentMusicId) {
      const nextSong = getPrevSongId(songs, currentMusicId);
      setCurrentMusicId(nextSong);
    }
  }

  return (
    <div className="relative h-full p-2 flex flex-col justify-end">
      {currentMusic && (
        <div className="bg-[#6B0000] p-5 text-white rounded-xl">
          <p className="text-center pb-4">Now Playing</p>
          <Image
            src={currentMusic.banner}
            alt="music-banner"
            width="239"
            height="136"
          />

          <p className="text-center mt-3">{currentMusic.title}</p>
          <p className="text-center text-gray-400 text-sm">{currentMusic.album}</p>

          {/* music controls */}
          <div className="flex items-center justify-center gap-4 mt-3">
            <button onClick={handlePrev}>
              <GiPreviousButton />
            </button>

            {isPlaying && (
              <button
                onClick={handlePause}
                className="bg-[#480000] p-3 rounded"
              >
                <FaPause />
              </button>
            )}

            {!isPlaying && (
              <button onClick={handlePlay} className="bg-[#480000] p-3 rounded">
                <FaPlay />
              </button>
            )}

            <button onClick={handleNext}>
              <GiNextButton />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
