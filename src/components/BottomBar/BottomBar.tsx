import { NavLink } from "react-router-dom";
import { MdCollections, MdCollectionsBookmark } from "react-icons/md";
import { PiWaveform ,PiWaveformBold} from "react-icons/pi";

import { CgProfile } from "react-icons/cg";
import { MiniPlayer } from "../MiniPlayer/MiniPlayer";
import { Track } from "../TrackList/TrackList";

import css from "./BottomBar.module.css";

interface BottomBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
export const BottomBar = ({
  currentTrack,
  isPlaying,
  setIsModalOpen,
}: BottomBarProps) => {
  return (
    <div className={css.container}>
      {currentTrack && (
        <div className={css.playerContainer}>
          <MiniPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            onOpen={() => setIsModalOpen(true)}
          />
        </div>
      )}
      <nav className={css.bottomBar}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          {({ isActive }: { isActive: boolean }) => (
            <>
              {isActive ? <PiWaveform size={24} /> : <PiWaveformBold size={24} />}
              <span>Wave</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/collections"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          {({ isActive }: { isActive: boolean }) => (
            <>
              {isActive ? (
                <MdCollectionsBookmark size={24} />
              ) : (
                <MdCollections size={24} />
              )}
              <span>Collections</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          <CgProfile size={24} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};
