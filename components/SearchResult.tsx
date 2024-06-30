import React from "react";
import ArtistBanner from "./ArtistBanner";
import MusicListing from "./MusicListing";
import { MusicProvider } from "@/lib/context/music";

export default function SearchResult() {
  return (
    <div className="h-screen w-full">
      <div className="h-7"></div>
      <MusicProvider>
        <ArtistBanner />
        <MusicListing />
      </MusicProvider>
    </div>
  );
}
