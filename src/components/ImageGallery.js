import css from './App.module.css'
import { ImageGalleryItem } from './ImageGalleryItem'
import { Loader } from './Loader'
import PropTypes from 'prop-types';
import nextId from "react-id-generator";

export const ImageGallery = ({ loading, galeryArr, openModal }) => {

    if (galeryArr.length > 0) {

        return <div>
            <ul className={(css.ImageGallery)} >
                {galeryArr.map(({ id, largeImageURL, webformatURL, tags }) => {
                    return (
                        <ImageGalleryItem
                            key={nextId()}
                            id={id}
                            tags={tags}
                            webformatURL={webformatURL}
                            largeImageURL={largeImageURL}
                            openModal={() => openModal(largeImageURL, tags)}
                        />
                    );
                })}
            </ul>
        </div>
    }
    if (loading) {
        return <Loader classname={(css.loaderWrap)} />
    }
}


ImageGallery.propTypes = {
    openModal: PropTypes.func,
    galeryArr: PropTypes.array,
    currentPage: PropTypes.number,
    loading: PropTypes.bool
};