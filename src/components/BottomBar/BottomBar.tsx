import { NavLink } from "react-router-dom";
import { RiHome5Line, RiHome5Fill } from "react-icons/ri";
import { MdCollections, MdCollectionsBookmark } from "react-icons/md";
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
              {isActive ? <RiHome5Fill size={24} /> : <RiHome5Line size={24} />}
              <span>Feed</span>
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
