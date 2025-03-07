import {useState, RefObject} from "react";
import {Banner} from "../../components/Banner/Banner";
import {Search} from "../../components/Search/Search";
import {TrackList} from "../../components/TrackList/TrackList";

import css from "./Wave.module.css";

interface Track {
    id: number;
    title: string;
    artist: string;
    poster: string;
    audioUrl: string;
    duration: string;
}

interface WaveProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    onTrackSelect: (track: Track | null) => void;
    onPlayingChange: (isPlaying: boolean) => void;
}

export const Wave: React.FC<WaveProps> = ({
                                              audioRef,
                                              onTrackSelect,
                                              onPlayingChange,
                                          }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div className={css.container}>
            <div className={css.inner}>
                <Banner/>
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder='Search by your wave...'/>
                <TrackList
                    searchQuery={searchQuery}
                    audioRef={audioRef}
                    onTrackSelect={onTrackSelect}
                    onPlayingChange={onPlayingChange}
                />
            </div>
        </div>
    );
};
