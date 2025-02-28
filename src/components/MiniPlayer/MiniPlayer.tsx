import React from "react";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import css from "./MiniPlayer.module.css";

interface Track {
  id: number;
  title: string;
  artist: string;
  poster: string;
  audioUrl: string;
  duration: string;
}

interface MiniPlayerProps {
  track: Track;
  isPlaying: boolean;
  onOpen: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  track,
  isPlaying,
  onOpen,
}) => {
  return (
    <div className={css.miniPlayer} onClick={onOpen}>
      <img src={track.poster} alt={track.title} className={css.poster} />
      <div className={css.marquee}>
        <span>{`${track.title} - ${track.artist}`}</span>
      </div>
      <div className={css.playButton}>
        {isPlaying ? (
          <IoPauseCircle size={32} className={css.playIcon} />
        ) : (
          <IoPlayCircle size={32} className={css.playIcon} />
        )}
      </div>
    </div>
  );
};
