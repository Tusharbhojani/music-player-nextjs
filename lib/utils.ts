import { SongProps } from "./context/music";

export function getNextSongId(songs : SongProps[], currentId : number){
    const currentIndex = songs.findIndex(song => song.id === currentId);
    const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    const nextSong = songs[nextIndex];
    return nextSong.id;
}


export function getPrevSongId(songs : SongProps[], currentId : number){
    const currentIndex = songs.findIndex(song => song.id === currentId);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    const prevSong = songs[prevIndex];
    return prevSong.id;
}

