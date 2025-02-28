import css from "./Banner.module.css";

interface BannerProps {
  cover: string;
}

export const Banner = ({ cover }: BannerProps) => {
  return (
    <div className={css.banner}>
      <img src={cover} alt="Advertisement" />
      <div className={css.overlay}>
        <h1 className={css.title}>Aurifly</h1>
      </div>
    </div>
  );
};
