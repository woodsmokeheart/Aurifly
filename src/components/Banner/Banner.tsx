import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import poster3 from "../../assets/covers/333.jpg";
import {IoChevronBack, IoChevronForward} from "react-icons/io5";
import css from "./Banner.module.css";

interface Slide {
    image: string;
    title?: string;
    subtitle?:string;
    link?: string;
}

const slides: Slide[] = [
    { image: poster3 },
    {
        image: poster3,
        title: "Alteriat Custom Wear",
        subtitle:'Одежда, созданная с душой, эксклюзивно для тебя.',
        link: "https://t.me/alteriat"
    },
    {
        image: poster3,
        title: "Мамина База",
        subtitle:' Полезные, жизненные советы от мамы двух деток.',
        link: "https://t.me/bubuarina"
    },
    {
        image: poster3,
        title: "Криптанутый",
        subtitle:'Зарабатываем без вложений. Обучение для новичков!',
        link: "https://t.me/cryptanutyj"
    },
    {
        image: poster3,
        title: "Саня до Ляма",
        subtitle:'Трейдер со стажем. Освещаю для вас топовые проекты.',
        link: "https://t.me/SanyadoLyama"
    }
];

export const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
            } else {
                setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setStartX(e.clientX);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
            } else {
                setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
            }
        }
    };

    return (
        <div
            className={css.banner}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${css.slide} ${index === currentIndex ? css.active : ""}`}
                >
                    <img src={slide.image} alt="" className={css.image} />
                    <div className={css.overlay}>
                        {index === 0 ? (
                            <h1 className={css.mainTitle}>Aurifly</h1>
                        ) : (
                            <div className={css.content}>
                                <h2 className={css.slideTitle}>{slide.title}</h2>
                                <h5 className={css.slideSubTitle}>{slide.subtitle}</h5>
                                <Link to={slide.link || ''} className={css.subscribeButton}>
                                    Посмотреть
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <button
                className={`${css.navButton} ${css.prevButton}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
                }}
            >
                <IoChevronBack />
            </button>
            <button
                className={`${css.navButton} ${css.nextButton}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev + 1) % slides.length);
                }}
            >
                <IoChevronForward />
            </button>
        </div>
    );
};
