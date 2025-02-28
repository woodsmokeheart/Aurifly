import { RefObject, useEffect, useState } from "react";
import { tracks } from "./useTracks";

import css from "./TrackList.module.css";

export interface Track {
  id: number;
  title: string;
  artist: string;
  poster: string;
  audioUrl: string;
  duration: string;
}

interface TrackListProps {
  searchQuery: string;
  audioRef: RefObject<HTMLAudioElement | null>;
  onTrackSelect: (track: Track | null) => void;
  onPlayingChange: (isPlaying: boolean) => void;
}

export const TrackList: React.FC<TrackListProps> = ({
  searchQuery,
  audioRef,
  onTrackSelect,
  onPlayingChange,
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const filteredTracks: Track[] = tracks.filter(
    (track: Track): boolean =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playNextTrack = () => {
    if (!currentTrack) return;

    const currentIndex = filteredTracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = currentIndex + 1;
    const nextTrack = filteredTracks[nextIndex] || filteredTracks[0];

    setCurrentTrack(nextTrack);
    onTrackSelect(nextTrack);
    setIsPlaying(true);
    onPlayingChange(true);

    if (audioRef.current) {
      audioRef.current.src = nextTrack.audioUrl;
      audioRef.current.play().catch((error: Error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
        onPlayingChange(false);
      });
    }
  };

  const handleTrackClick = (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack && currentTrack.id === track.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        onPlayingChange(false);
      } else {
        audio.play();
        setIsPlaying(true);
        onPlayingChange(true);
      }
    } else {
      setCurrentTrack(track);
      onTrackSelect(track);
      setIsPlaying(true);
      onPlayingChange(true);
      audio.src = track.audioUrl;
      audio.play().catch((error: Error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
        onPlayingChange(false);
      });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNextTrack();
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, currentTrack, filteredTracks]);

  return (
    <div className={css.trackList}>
      {filteredTracks.map((track: Track) => (
        <div
          key={track.id}
          className={`${css.trackItem} ${
            currentTrack?.id === track.id ? css.playing : ""
          }`}
          onClick={(): void => handleTrackClick(track)}
        >
          <img
            src={track.poster}
            alt={track.title}
            className={css.trackPoster}
          />
          <div className={css.trackInfo}>
            <div className={css.trackTitle}>{track.title}</div>
            <div className={css.trackArtist}>{track.artist}</div>
          </div>
          <div className={css.trackDuration}>
            {currentTrack?.id === track.id && isPlaying
              ? "Playing"
              : track.duration}
          </div>
        </div>
      ))}
    </div>
  );
};
