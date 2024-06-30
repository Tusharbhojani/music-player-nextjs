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


  export type progressProps = {
    seek: number;
    totalDuration: number;
  };