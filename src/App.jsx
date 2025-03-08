import {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useRef} from "react";
import {Wave} from "./pages/Wave/Wave.tsx";
import {Collections} from "./pages/Collections/Collections";
import {Profile} from "./pages/Profile/Profile";
import {BottomBar} from "./components/BottomBar/BottomBar";
import {PlayerModal} from "./components/PlayerModal/PlayerModal";

import {tracks} from "./components/TrackList/useTracks";

import css from "./App.module.css";

const tele = window.Telegram.WebApp;

function App() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const audioRef =
        useRef(null);

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
            audioRef.current.play().catch((error) => {
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
            audioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        tele.ready();
        tele.expand();

        // window.Telegram.WebApp.setHeaderColor('#29162c'); // Set header color to red
        window?.Telegram.WebApp.setHeaderColor("#1b1b1b"); // Set header color to red

        // Haptic feedback
        // if (tele.HapticFeedback) {
        //   tele.HapticFeedback.impactOccurred("medium");
        // }
        // if (navigator.vibrate) {
        //   navigator.vibrate(100); // Vibrate for 100ms
        // }
    }, []);

    useEffect(() => {
        let ts; // Сохраняет начальную позицию касания

        const onTouchStart = (e) => {
            ts = e.touches[0].clientY; // Записывает начальную Y-координату касания
        };

        const onTouchMove = (e) => {
            const el = scrollableEl.current;
            if (el) {
                const scroll = el.scrollTop;
                const te = e.changedTouches[0].clientY;
                // Если скролл в начале (scroll <= 0) и движение идет вниз (ts < te)
                if (scroll <= 0 && ts < te) {
                    e.preventDefault(); // Предотвращает действие по умолчанию, включая сворачивание
                }
            } else {
                e.preventDefault();
            }
        };

        const onTouchMoveWithException = (e) => {
            const target = e.target.closest("#refer");
            if (!target) {
                onTouchMove(e);
            }
        };

        // Добавление слушателей событий
        document.documentElement.addEventListener("touchstart", onTouchStart, {
            passive: false,
        });
        document.documentElement.addEventListener(
            "touchmove",
            onTouchMoveWithException,
            { passive: false }
        );

        // ...
    }, [location.pathname, overflow]);

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
