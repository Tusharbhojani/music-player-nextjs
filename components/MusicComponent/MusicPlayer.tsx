import React, { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import { SongProps, useMusic } from "@/lib/context/music";
import Image from "next/image";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { FaMusic, FaPause, FaPlay } from "react-icons/fa";
import { getNextSongId, getPrevSongId } from "@/lib/utils";
import ProgressBar from "./ProgressBar";
import classNames from "classnames";

export type progressProps = {
  seek: number;
  totalDuration: number;
};

export default function MusicPlayer() {
  const [
    { currentMusicId, isPlaying, songs },
    { setIsPlaying, setCurrentMusicId },
  ] = useMusic();

  const [isOpen, setIsOpen] = useState(false);
  const soundInstance = useRef<Howl | null>(null);
  const [currentMusic, setCurrentMusic] = useState<SongProps | null>(null);
  const [progress, setProgress] = useState<progressProps>({
    seek: 0,
    totalDuration: 0,
  });

  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (currentMusicId) {
      setCurrentMusic(songs?.find(({ id }) => id === currentMusicId) || null);
    }
  }, [currentMusicId]);

  useEffect(() => {
    if (currentMusic) {
      soundInstance.current = new Howl({
        src: [currentMusic.file],
      });
      soundInstance.current.play();
      setIsPlaying(true);

      setProgress({
        seek: 0,
        totalDuration: 0,
      });

      soundInstance.current.on("end", function () {
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      });

      soundInstance.current.on("pause", function () {
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      });

      soundInstance.current.on("play", function () {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        if (soundInstance.current) {
          setProgress({
            seek: soundInstance.current.seek(),
            totalDuration: soundInstance.current.duration(),
          });
        }
        
        intervalRef.current = setInterval(() => {
          if (soundInstance.current) {
            //  / soundInstance.current.duration() * 100
            setProgress({
              seek: soundInstance.current.seek(),
              totalDuration: soundInstance.current.duration(),
            });
          }
        }, 1000);
      });
    }

    return () => {
      // soundInstance.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
    if (currentMusicId && songs?.length) {
      const nextSong = getNextSongId(songs, currentMusicId);
      setCurrentMusicId(nextSong);
    }
  }

  function handlePrev() {
    if (currentMusicId && songs?.length) {
      const nextSong = getPrevSongId(songs, currentMusicId);
      setCurrentMusicId(nextSong);
    }
  }

  return (
    <div className="h-full p-2 flex flex-col justify-end">
      {currentMusicId && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute bottom-10 p-4 right-4 z-10 rounded-full bg-[#6B0000] text-white flex items-center justify-center lg:hidden"
        >
          <FaMusic size={25} />
        </button>
      )}
      {currentMusic && (
        <div
          className={classNames(
            "bg-[#6B0000] p-5 text-white rounded-xl",
            isOpen &&
              "absolute bottom-28 p-4 right-4 z-10 lg:relative lg:bottom-auto lg:right-auto lg:mb-5"
          )}
        >
          <p className="text-center pb-4">Now Playing</p>
          <Image
            src={currentMusic.banner}
            alt="music-banner"
            width="239"
            height="136"
          />

          <p className="text-center mt-3">{currentMusic.title}</p>
          <p className="text-center text-gray-400 text-sm">
            {currentMusic.album}
          </p>

          {/* progress bar */}
          <ProgressBar progress={progress} />

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
