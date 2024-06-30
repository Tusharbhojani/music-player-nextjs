import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
  } from "react";
  import { SONGS } from "@/data/songs";
  
  type SongProps = {
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
    currentMusic: SongProps | null;
  };
  
  type UpdateStateProps = {
    setCurrentMusic: Dispatch<SetStateAction<SongProps | null>>;
    setSongs: Dispatch<SetStateAction<SongProps[]>>;
  };
  
  export const MusicContext = createContext<StatesProps | undefined>(undefined);
  export const MusicDispatchContext = createContext<UpdateStateProps | undefined>(
    undefined
  );
  
  export function MusicProvider({ children }: { children: React.ReactNode }) {
    const [currentMusic, setCurrentMusic] = useState<SongProps | null>(null);
    const [songs, setSongs] = useState<SongProps[]>(SONGS);
  
    const states = {
      songs,
      currentMusic,
    };
  
    const updateStateFunctions = {
      setSongs,
      setCurrentMusic,
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
  