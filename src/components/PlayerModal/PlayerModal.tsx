import React, { useRef, useEffect, useState,RefObject } from "react";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5"; // Импортируем иконки
import { IoIosSkipForward, IoIosSkipBackward } from "react-icons/io";

import css from "./PlayerModal.module.css";

interface Track {
  title: string;
  artist: string;
  poster: string;
  duration: string;
}

interface PlayerModalProps {
  track: Track | null;
  isPlaying: boolean;
  onClose: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  track,
  isPlaying,
  onClose,
  onPlay,
  onPause,
  onNext,
  onPrev,
  audioRef,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!track) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.background}>
          <div className={css.wave}></div>
          <div className={css.wave}></div>
          <div className={css.wave}></div>
          <div className={css.wave}></div>
        </div>

        <img src={track.poster} alt={track.title} className={css.poster} />

        <div className={css.info}>
          <h2 className={css.title}>{track.title}</h2>
          <p className={css.artist}>{track.artist}</p>

          <div className={css.progressContainer}>
            <span className={css.time}>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className={css.progressBar}
              ref={progressRef}
            />
            <span className={css.time}>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={css.controls}>
          <button className={css.controlButton} onClick={onPrev}>
            <IoIosSkipBackward size={24} />
          </button>
          <button
            className={`${css.controlButton} ${css.playButton}`}
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? (
              <IoPauseCircle size={40} />
            ) : (
              <IoPlayCircle size={40} />
            )}
          </button>
          <button className={css.controlButton} onClick={onNext}>
            <IoIosSkipForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
