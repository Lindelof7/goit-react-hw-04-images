import css from './App.module.css'

export const ImageGalleryItem = ({ openModal, webformatURL, tags }) => {

    return (<li onClick={openModal} className={(css.ImageGalleryItem)}>
        <img className={(css.ImageGalleryItemImage)} src={webformatURL} alt={tags} />
    </li>
    )
}
