import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { SONGS } from "@/data/songs";

export type SongProps = {
  id: number;
  title: string;
  playing: string;
  time: string;
  album: string;
  thumbnail: string;
  banner: string;
  artist_name: string;
  file: string;
};

type StatesProps = {
  songs: SongProps[];
  currentMusicId: number | null;
  isPlaying: boolean;
};

type UpdateStateProps = {
  setCurrentMusicId: Dispatch<SetStateAction<number | null>>;
  setSongs: Dispatch<SetStateAction<SongProps[]>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
};

export const MusicContext = createContext<StatesProps | undefined>(undefined);
export const MusicDispatchContext = createContext<UpdateStateProps | undefined>(
  undefined
);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentMusicId, setCurrentMusicId] = useState<number | null>(null);
  const [songs, setSongs] = useState<SongProps[]>(SONGS);
  const [isPlaying, setIsPlaying] = useState(false);

  const states = {
    songs,
    currentMusicId,
    isPlaying
  };

  const updateStateFunctions = {
    setSongs,
    setCurrentMusicId,
    setIsPlaying
  };

  return (
    <MusicContext.Provider value={states}>
      <MusicDispatchContext.Provider value={updateStateFunctions}>
        {children}
      </MusicDispatchContext.Provider>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const states = useContext(MusicContext);
  const updateStateFunctions = useContext(MusicDispatchContext);

  if (states === undefined || updateStateFunctions === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }

  return [states, updateStateFunctions] as const;
}
