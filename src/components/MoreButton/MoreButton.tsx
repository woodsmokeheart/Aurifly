import React from 'react';
import { MdMoreHoriz } from "react-icons/md";
import css from './MoreButton.module.css';

interface MoreButtonProps {
    onClick: (event: React.MouseEvent) => void;
}

export const MoreButton: React.FC<MoreButtonProps> = ({onClick}) => {
    return (
        <button className={css.moreButton} onClick={onClick}>
           <MdMoreHoriz/>
        </button>
    );
};
