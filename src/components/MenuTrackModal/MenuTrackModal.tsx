import {Modal} from "../Modal/Modal.tsx";
import css from './MenuTrackModal.module.css';

interface MenuTrackModalProps {
    isOpen: boolean;
    onClose: VoidFunction;
    onAction: (action: string) => void;
}

export const MenuTrackModal = ({isOpen, onClose, onAction,}: MenuTrackModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <button
                className={css.actionButton}
                onClick={() => onAction('add')}
            >
                Add to Playlist
            </button>
            <button
                className={css.actionButton}
                onClick={() => onAction('share')}
            >
                Share
            </button>
            <button
                className={`${css.actionButton} ${css.danger}`}
                onClick={() => onAction('remove')}
            >
                Remove from the wave
            </button>
        </Modal>
    )
}
