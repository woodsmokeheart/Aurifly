// MiniPlayer.tsx
import React, {useState} from "react";
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
    onOpen: VoidFunction;
    onNextTrack: VoidFunction;
    onPrevTrack: VoidFunction;
    prevTrack?: Track | null;
    nextTrack?: Track | null;
}

export const MiniPlayer = ({
                               track,
                               isPlaying,
                               onOpen,
                               onNextTrack,
                               onPrevTrack,
                               prevTrack,
                               nextTrack
                           }: MiniPlayerProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isSwiping, setIsSwiping] = useState(false);

    // Определяем минимальное расстояние свайпа в зависимости от ширины экрана
    const minSwipeDistance = window.innerWidth <= 480 ? 30 : 50;
    // Добавляем коэффициент для более быстрого появления соседних треков
    const opacityDivisor = window.innerWidth <= 480 ? 100 : 200;

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);

        if (touchStart && e.targetTouches[0].clientX) {
            const swipeDistance = touchStart - e.targetTouches[0].clientX;
            const element = e.currentTarget as HTMLElement;
            const parentElement = element.parentElement as HTMLElement;

            // Движение текущего трека
            element.style.transform = `translateX(${-swipeDistance}px)`;

            // Движение соседних треков
            const prevTrack = parentElement.querySelector(`.${css.prevTrack}`) as HTMLElement;
            const nextTrack = parentElement.querySelector(`.${css.nextTrack}`) as HTMLElement;

            if (swipeDistance > 0) {
                // Свайп влево - показываем следующий трек
                nextTrack.style.transform = `translateX(${-swipeDistance}px)`;
                nextTrack.style.opacity = `${Math.min(Math.abs(swipeDistance) / opacityDivisor, 0.7)}`;
            } else {
                // Свайп вправо - показываем предыдущий трек
                prevTrack.style.transform = `translateX(${-swipeDistance}px)`;
                prevTrack.style.opacity = `${Math.min(Math.abs(swipeDistance) / opacityDivisor, 0.7)}`;
            }
        }
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const element = e.currentTarget as HTMLElement;
        const parentElement = element.parentElement as HTMLElement;

        // Сброс всех трансформаций
        element.style.transform = '';
        const prevTrack = parentElement.querySelector(`.${css.prevTrack}`) as HTMLElement;
        const nextTrack = parentElement.querySelector(`.${css.nextTrack}`) as HTMLElement;
        prevTrack.style.transform = '';
        nextTrack.style.transform = '';
        prevTrack.style.opacity = '0';
        nextTrack.style.opacity = '0';

        setIsSwiping(false);

        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            onNextTrack();
        }
        if (isRightSwipe) {
            onPrevTrack();
        }
    };

    const onTouchCancel = (e: React.TouchEvent) => {
        const element = e.currentTarget as HTMLElement;
        const parentElement = element.parentElement as HTMLElement;

        // Сброс всех трансформаций
        element.style.transform = '';
        const prevTrack = parentElement.querySelector(`.${css.prevTrack}`) as HTMLElement;
        const nextTrack = parentElement.querySelector(`.${css.nextTrack}`) as HTMLElement;
        prevTrack.style.transform = '';
        nextTrack.style.transform = '';
        prevTrack.style.opacity = '0';
        nextTrack.style.opacity = '0';

        setIsSwiping(false);
        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div className={css.miniPlayer}>
            {/* Предыдущий трек */}
            <div className={`${css.adjacentTrack} ${css.prevTrack}`}>
                <img src={prevTrack?.poster || track.poster} alt={prevTrack?.title || ''} className={css.poster}/>
                <div className={css.marquee}>
                    <span>{prevTrack ? `${prevTrack.title} - ${prevTrack.artist}` : ''}</span>
                </div>
            </div>

            {/* Текущий трек */}
            <div
                className={`${css.content} ${isSwiping ? css.swiping : ''}`}
                onClick={onOpen}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchCancel}
            >
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

            {/* Следующий трек */}
            <div className={`${css.adjacentTrack} ${css.nextTrack}`}>
                <img src={nextTrack?.poster || track.poster} alt={nextTrack?.title || ''} className={css.poster}/>
                <div className={css.marquee}>
                    <span>{nextTrack ? `${nextTrack.title} - ${nextTrack.artist}` : ''}</span>
                </div>
            </div>
        </div>
    );
};
