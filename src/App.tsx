import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useRef, RefObject} from "react";
import {Wave} from "./pages/Wave/Wave.tsx";
import {Collections} from "./pages/Collections/Collections";
import {Profile} from "./pages/Profile/Profile";
import {BottomBar} from "./components/BottomBar/BottomBar";
import {PlayerModal} from "./components/PlayerModal/PlayerModal";

import {tracks} from "./components/TrackList/useTracks";

import css from "./App.module.css";

interface Track {
    id: number;
    title: string;
    artist: string;
    poster: string;
    audioUrl: string;
    duration: string;
}

function App() {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const audioRef: RefObject<HTMLAudioElement | null> =
        useRef<HTMLAudioElement>(null);

    const getAdjacentTracks = () => {
        if (!currentTrack || !tracks.length) return {prevTrack: null, nextTrack: null};

        const currentIndex = tracks.findIndex(
            (track) => track.id === currentTrack.id
        );

        const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        const nextIndex = (currentIndex + 1) % tracks.length;

        return {
            prevTrack: tracks[prevIndex],
            nextTrack: tracks[nextIndex]
        };
    };

    const playNextTrack = () => {
        if (!currentTrack || !tracks.length) return;

        const currentIndex = tracks.findIndex(
            (track) => track.id === currentTrack.id
        );
        const nextIndex = (currentIndex + 1) % tracks.length;
        const nextTrack = tracks[nextIndex];

        setCurrentTrack(nextTrack);
        if (audioRef.current) {
            audioRef.current.src = nextTrack.audioUrl;
            audioRef.current.play().catch((error: Error) => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    const playPrevTrack = () => {
        if (!currentTrack || !tracks.length) return;

        const currentIndex = tracks.findIndex(
            (track) => track.id === currentTrack.id
        );
        const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        const prevTrack = tracks[prevIndex];

        setCurrentTrack(prevTrack);
        if (audioRef.current) {
            audioRef.current.src = prevTrack.audioUrl;
            audioRef.current.play().catch((error: Error) => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    const {prevTrack, nextTrack} = getAdjacentTracks();

    return (
        <BrowserRouter>
            <div className={css.wrapper}>
                <div className={css.pageContainer}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Wave
                                    audioRef={audioRef}
                                    onTrackSelect={setCurrentTrack}
                                    onPlayingChange={setIsPlaying}
                                    currentTrack={currentTrack}
                                    isPlaying={isPlaying}
                                />
                            }
                        />
                        <Route path="/collections" element={<Collections/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </div>

                <BottomBar
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    setIsModalOpen={setIsModalOpen}
                    onNextTrack={playNextTrack}
                    onPrevTrack={playPrevTrack}
                    prevTrack={prevTrack}
                    nextTrack={nextTrack}
                />

                {isModalOpen && currentTrack && (
                    <PlayerModal
                        track={currentTrack}
                        isPlaying={isPlaying}
                        onClose={() => setIsModalOpen(false)}
                        onPlay={() => {
                            if (audioRef.current) {
                                audioRef.current.play();
                                setIsPlaying(true);
                            }
                        }}
                        onPause={() => {
                            if (audioRef.current) {
                                audioRef.current.pause();
                                setIsPlaying(false);
                            }
                        }}
                        onNext={playNextTrack}
                        onPrev={playPrevTrack}
                        audioRef={audioRef}
                    />
                )}

                <audio ref={audioRef}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
