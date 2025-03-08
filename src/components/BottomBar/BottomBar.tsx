import {NavLink} from "react-router-dom";
import {IoPersonCircleOutline} from "react-icons/io5";
import {PiWaveform, PiWaveformBold} from "react-icons/pi";
import {HiCollection} from "react-icons/hi";
import {MiniPlayer} from "../MiniPlayer/MiniPlayer";
import {Track} from "../TrackList/TrackList";

import css from "./BottomBar.module.css";

interface BottomBarProps {
    currentTrack: Track | null;
    isPlaying: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onNextTrack: VoidFunction;
    onPrevTrack: VoidFunction;
    prevTrack?: Track | null;
    nextTrack?: Track | null;
}

export const BottomBar = ({
                              currentTrack,
                              isPlaying,
                              setIsModalOpen,
                              onNextTrack,
                              onPrevTrack,
                              prevTrack,
                              nextTrack
                          }: BottomBarProps) => {
    return (
        <div className={css.container}>
            {currentTrack && (
                <div className={css.playerContainer}>
                    <MiniPlayer
                        track={currentTrack}
                        isPlaying={isPlaying}
                        onOpen={() => setIsModalOpen(true)}
                        onNextTrack={onNextTrack}
                        onPrevTrack={onPrevTrack} prevTrack={prevTrack}
                        nextTrack={nextTrack}/>
                </div>
            )}
            <nav className={css.bottomBar}>
                <NavLink
                    to="/"
                    className={({isActive}) =>
                        isActive ? `${css.link} ${css.active}` : css.link
                    }
                >
                    {({isActive}: { isActive: boolean }) => (
                        <>
                            {isActive ? <PiWaveform size={24}/> : <PiWaveformBold size={24}/>}
                            <span>Wave</span>
                        </>
                    )}
                </NavLink>
                <NavLink
                    to="/collections"
                    className={({isActive}) =>
                        isActive ? `${css.link} ${css.active}` : css.link
                    }
                >
                    {({isActive}: { isActive: boolean }) => (
                        <>
                            {isActive ? (
                                <HiCollection size={24}/>
                            ) : (
                                <HiCollection size={24}/>
                            )}
                            <span>Library</span>
                        </>
                    )}
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({isActive}) =>
                        isActive ? `${css.link} ${css.active}` : css.link
                    }
                >
                    <IoPersonCircleOutline size={24}/>
                    <span>Profile</span>
                </NavLink>
            </nav>
        </div>
    );
};
