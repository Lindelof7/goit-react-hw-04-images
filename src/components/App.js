import { Component } from "react";
import { Searchbar } from './Searchbar'
import { ImageGallery } from './ImageGallery'
import css from './App.module.css'
import { Modal } from "./Modal";
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { Button } from './Button'

export class App extends Component {
  state = {
    searchbar: '',
    tags: '',
    largeImageURL: '',
    isModalOpen: false,
    currentPage: 1,
    galeryArr: [],
    loading: false,
    photosDiff: false,
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchbar !== this.state.searchbar || prevState.currentPage !== this.state.currentPage) {
      this.setState({ loading: true })
      this.fetchPhotos()
    }
  }


  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };


  fetchPhotos = () => {
    fetch(`https://pixabay.com/api/?q=${this.state.searchbar}&page=${this.state.currentPage}&key=32358654-06404774fd2fdef00d453a3c4&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) { return (response.json()) }
        Promise.reject(new Error('Please provide valid search value'))
        return Notiflix.Notify.error('Sorry, service trouble occured')
      })
      .then(({ hits, totalHits }) => {
        {
          if (hits.length < 1) {
            Notiflix.Notify.failure('There is no photos with such attributes')
          }
          const totalPages = Math.ceil(totalHits / 12);
          const pagesDiff = totalPages - this.state.currentPage
          if (pagesDiff > 0) {
            this.setState({ photosDiff: true })
          } else this.setState({ photosDiff: false })
        }
        this.setState({ galeryArr: [...this.state.galeryArr, ...hits], })
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  openModal = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags });

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  onSubmitForm = event => {
    if (event !== this.state.searchbar) {
      this.setState({
        searchbar: event,
        galeryArr: [],
        currentPage: 1,
      });
    } else {
      Notiflix.Notify.failure('The new search must be different from the current search');
    }
  };

  render() {

    const { searchbar, isModalOpen, largeImageURL, tags, loading, galeryArr, photosDiff } = this.state;

    return (
      <div className={(css.App)} id='list'>
        <Searchbar onSearch={this.onSubmitForm} />
        <ImageGallery loading={loading} galeryArr={galeryArr} searchbar={searchbar} openModal={this.openModal} />
        {isModalOpen && <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} tags={tags} />}
        {photosDiff && <Button className={css.loadMoreBtn} onClick={this.loadMore} />}
      </div>)
  };
};

App.propTypes = {
  searchbar: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  isModalOpen: PropTypes.bool,
};
