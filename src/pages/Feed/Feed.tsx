import { useState, RefObject } from "react";
import { Banner } from "../../components/Banner/Banner";
import { Search } from "../../components/Search/Search";
import { TrackList } from "../../components/TrackList/TrackList";
import poster3 from "../../assets/covers/333.jpg";

import css from "./Feed.module.css";

interface Track {
  id: number;
  title: string;
  artist: string;
  poster: string;
  audioUrl: string;
  duration: string;
}

interface FeedProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  onTrackSelect: (track: Track | null) => void;
  onPlayingChange: (isPlaying: boolean) => void;
}

export const Feed: React.FC<FeedProps> = ({
  audioRef,
  onTrackSelect,
  onPlayingChange,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className={css.container}>
      <Banner cover={poster3} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TrackList
        searchQuery={searchQuery}
        audioRef={audioRef}
        onTrackSelect={onTrackSelect}
        onPlayingChange={onPlayingChange}
      />
    </div>
  );
};
