import React, { useState } from "react";
import {IoPlayCircle, IoPauseCircle, IoHeart, IoHeartOutline} from "react-icons/io5";
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

export const MiniPlayer: React.FC<MiniPlayerProps> = ({track, isPlaying, onOpen,}) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <div className={css.miniPlayer}>
            <img src={track.poster} alt={track.title} className={css.poster}/>
            <div className={css.marquee}>
                <span>{`${track.title} - ${track.artist}`}</span>
            </div>
            <button
                className={css.likeButton}
                onClick={handleLike}
            >
                {isLiked ? (
                    <IoHeart size={24} className={css.likeIcon}/>
                ) : (
                    <IoHeartOutline size={24} className={css.likeIcon}/>
                )}
            </button>
            <button className={css.playButton} onClick={onOpen}>
                {isPlaying ? (
                    <IoPauseCircle size={32} className={css.playIcon}/>
                ) : (
                    <IoPlayCircle size={32} className={css.playIcon}/>
                )}
            </button>
        </div>
    );
};
