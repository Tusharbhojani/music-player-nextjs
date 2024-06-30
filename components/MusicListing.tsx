import { Reorder } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { useMusic } from "@/lib/context/music";
import classNames from "classnames";
import { FaMusic } from "react-icons/fa";

export default function MusicListing() {
  const [{ songs, currentMusicId, isPlaying }, { setSongs, setCurrentMusicId }] = useMusic();
  const [isDragging, setIsDragging] = useState(false);

  function playSong(id:number) {
    if (!isDragging) {
      setCurrentMusicId(id);
      console.log("click event");
    }
  }

  return (
    <div>
      <table id="music_listing" className="text-white w-full">
        <thead>
          <tr className="">
            <td className="text-right">#</td>
            <td>Title</td>
            <td>Playing</td>
            <td>Time</td>
            <td>Album</td>
          </tr>
        </thead>

        <Reorder.Group as="tbody" values={songs} onReorder={setSongs}>
          {songs.map((song, index) => {
            const isActiveSong = song.id === currentMusicId;
            return (
              <Reorder.Item
                onDrag={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onClick={()=> playSong(song.id)}
                as="tr"
                className={classNames(
                  "hover:bg-[#4c0000cd] transition-colors cursor-pointer",
                  isActiveSong && "bg-[#520000]"
                )}
                value={song}
                key={song.id}
              >
                <td>
                  <div className="flex w-full h-full justify-end gap-3 items-center">
                    {isActiveSong && <FaMusic size={25} />}
                    <p>{index}</p>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <Image
                      src={"/images/thumbnail.png"}
                      alt="ss"
                      width={54}
                      height={54}
                    ></Image>
                    {song.title}
                  </div>
                </td>
                <td>{song.playing}</td>
                <td>{song.time}</td>
                <td>{song.album}</td>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </table>
    </div>
  );
}
