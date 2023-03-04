import css from './App.module.css'
import Notiflix from 'notiflix';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useState } from "react";


export const Searchbar = ({ onSearch }) => {

    const [searchbar, setSearchbar] = useState('');


    const changeSearch = evt =>
        setSearchbar(evt.currentTarget.value);

    const handleSubmitForm = event => {
        event.preventDefault();
        if (searchbar.trim() === '') {
            return Notiflix.Notify.failure('Please write search options')
        }
        onSearch(searchbar);
        setSearchbar('');
    };

    return (
        <div>

            <header className={(css.Searchbar)}>
                <form className={(css.SearchForm)}>
                    <button type="submit" onClick={handleSubmitForm} className={(css.SearchFormButton)}  >
                        <FiSearch className={(css.searchIcon)} />
                        <span className={(css.SearchFormButtonLabel)} >Search</span>
                    </button>
                    <input
                        onChange={changeSearch}
                        className={(css.SearchFormInput)}
                        type="text"
                        placeholder="Search images and photos"
                        value={searchbar}
                    />
                </form>
            </header >
        </div>
    )
}



Searchbar.propTypes = {
    searchbar: PropTypes.string
};