import { Searchbar } from './Searchbar'
import { ImageGallery } from './ImageGallery'
import css from './App.module.css'
import { Modal } from "./Modal";
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { Button } from './Button'
import { useState, useEffect } from "react";

export const App = () => {

    const [searchbar, setSearchbar] = useState('');
    const [tags, setTags] = useState('');
    const [largeImageURL, setLargeImageURL] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [galeryArr, setGaleryArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [photosDiff, setPhotosDiff] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (searchbar === '') {
            return
        }
        setLoading(true);
        fetch(`https://pixabay.com/api/?q=${searchbar}&page=${currentPage}&key=32358654-06404774fd2fdef00d453a3c4&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
                if (response.ok) { return (response.json()) }
                Promise.reject(new Error('Please provide valid search value'))
                return Notiflix.Notify.error('Sorry, service trouble occured')
            })
            .then(({ hits, totalHits }) => {
                {
                    if (hits.length < 1) {
                        return Notiflix.Notify.failure('There is no photos with such attributes')
                    }
                    const totalPages = Math.ceil(totalHits / 12);
                    const pagesDiff = totalPages - currentPage
                    if (pagesDiff > 0) {
                        setPhotosDiff(true)
                    } else setPhotosDiff(false)
                }
                setGaleryArr(prevGaleryArr => [...prevGaleryArr, ...hits])
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))
    }, [searchbar, currentPage]);

    const shouldLoadMoreBtnRender = galeryArr.length > 0 && !loading && photosDiff;

    const loadMore = () => {
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    };

    const openModal = (largeImageURL, tags) => {
        setLargeImageURL(largeImageURL);
        setTags(tags);
        toggleModal();
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    };

    const onSubmitForm = event => {
        setSearchbar(event);
        setCurrentPage(1);
        setGaleryArr([])
        // if (event !== this.state.searchbar) {
        //     this.setState({
        //         searchbar: event,
        //         galeryArr: [],
        //         currentPage: 1,
        //     });
        // } else {
        //     Notiflix.Notify.failure('The new search must be different from the current search');
        // }
    };

    return (
        <div className={(css.App)} id='list'>
            <Searchbar onSearch={onSubmitForm} />
            <ImageGallery loading={loading} galeryArr={galeryArr} searchbar={searchbar} openModal={openModal} />
            {error && <h1>Error occured</h1>}
            {isModalOpen && <Modal onClose={toggleModal} largeImageURL={largeImageURL} tags={tags} />}
            {shouldLoadMoreBtnRender && <Button className={css.loadMoreBtn} onClick={loadMore} />}
        </div>)
};

App.propTypes = {
    searchbar: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
    isModalOpen: PropTypes.bool,
};
