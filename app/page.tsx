"use client";
import MusicPlayer from "@/components/MusicPlayer";
import SearchResult from "@/components/SearchResult";
import { MusicProvider } from "@/lib/context/music";

export default function Home() {
  return (
    <MusicProvider>
      <main className="grid grid-cols-12 min-h-screen">
        <div className="col-span-2 bg-black"></div>
        <div className="col-span-8 search_result_component h-full overflow-y-scroll">
          <SearchResult />
        </div>
        <div className="col-span-2 bg-black">
          <MusicPlayer />
        </div>
      </main>
    </MusicProvider>
  );
}
