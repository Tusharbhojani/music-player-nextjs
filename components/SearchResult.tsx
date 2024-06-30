import React from "react";
import ArtistBanner from "./ArtistBanner";
import MusicListing from "./MusicListing";

export default function SearchResult() {
  return (
    <div className="h-screen w-full">
      <div className="h-7"></div>
      <ArtistBanner />
      <MusicListing />
    </div>
  );
}
