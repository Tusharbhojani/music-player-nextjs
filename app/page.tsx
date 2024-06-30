"use client";
import MusicPlayer from "@/components/MusicComponent/MusicPlayer";
import SearchResult from "@/components/SearchResult";
import { MusicProvider } from "@/lib/context/music";

export default function Home() {
  return (
    <MusicProvider>
      <main className="fixed inset-0 w-full h-full lg:grid lg:grid-cols-12">
        <div className="lg:col-span-2 bg-black"></div>
        <div className="lg:col-span-7 2xl:col-span-8 search_result_component h-full overflow-y-scroll">
          <SearchResult />
        </div>
        <div className="lg:col-span-3 2xl:col-span-2 bg-black">
          <MusicPlayer />
        </div>
      </main>
    </MusicProvider>
  );
}
