import React, { useEffect } from "react";
import ArtistBanner from "./ArtistBanner";
import { getData } from "@/lib/apiService";
import { useMusic } from "@/lib/context/music";
import MusicListing from "./MusicComponent/MusicListing";

export default function SearchResult() {
  const [{}, { setSongs }] = useMusic();
  async function getPlayList() {
    try {
      const { data, message, success } = await getData({
        endpoint: "../api/getPlaylist",
      });
      if (success) {
        console.log({ message, data });
        setSongs(data);
      } else {
        alert(message);
      }
    } catch (error: any) {
      // Handle error
      alert(error.message);
    }
  }

  useEffect(() => {
    getPlayList();
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="h-7"></div>
      <ArtistBanner />
      <MusicListing />
    </div>
  );
}
