import { Reorder } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { useMusic } from "@/lib/context/music";

export default function MusicListing() {
  const [{ songs }, { setSongs }] = useMusic();
  const [isDragging, setIsDragging] = useState(false);

  function handleClick() {
    if (!isDragging) {
      console.log("click event");
    }
  }

  return (
    <div>
      <table id="music_listing" className="text-white w-full">
        <thead>
          <tr className="">
            <td className="first_td">#</td>
            <td>Title</td>
            <td>Playing</td>
            <td>Time</td>
            <td>Album</td>
          </tr>
        </thead>

        <Reorder.Group as="tbody" values={songs} onReorder={setSongs}>
          {songs.map((song, index) => {
            return (
              <Reorder.Item
                onDrag={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onClick={handleClick}
                as="tr"
                className="hover:bg-[#4c0000cd] transition-colors cursor-pointer"
                value={song}
                key={song.id}
              >
                <td className="first_td">{index}</td>
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
