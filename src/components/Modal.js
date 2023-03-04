import css from './App.module.css'
import { useEffect } from "react";

export const Modal = ({ onClose, tags, largeImageURL }) => {

    const handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });


    return (
        <div className={(css.Overlay)} onClick={onClose}>
            <div className={(css.Modal)}>
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>
    )
}
