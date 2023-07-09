// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getImages } from './services/pixabayAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonMore from './Button/ButtonMore';
import Loader from './Loader/Loaader';
import Modal from './Modal/Modal';
import css from './App.module.css';

// class App extends Component {
export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pics, setPics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadBtn, setLoadBtn] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [bigImage, setBigImage] = useState('');

  // Рендер відподіз з API
  useEffect(() => {
    if (query === '') {
      return;
    }

    async function newSearchRequest() {
      try {
        const response = await getImages(query, page);
        const mathPages = Math.ceil(response.data.totalHits / 12);

        setIsLoading(true);

        if (page === mathPages) {
          setLoadBtn(false);
          setIsLoading(false);
          alert('The end');
        }

        if (response.data.hits.length === 0) {
          alert('No results found');
          setIsLoading(false);
        }
        setPics(prevState => [...prevState, ...response.data.hits]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(true);
    newSearchRequest();
    return () => {};
  }, [query, page]);

  // Запит зображення на API
  function onSearch(searchItem) {
    setQuery(searchItem);
    setPics([]);
    setPage(1);
    setLoadBtn(true);
  }

  // Load more
  function loadMore() {
    setPage(prevState => prevState + 1);
  }

  function openModal(image) {
    setIsModal(true);
    setBigImage(image);
  }

  function closeModal() {
    setIsModal(false);
    setBigImage('');
  }

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSearch} />
      <ImageGallery images={pics} onImageClick={openModal} />
      {isLoading && <Loader />}
      {loadBtn && <ButtonMore onLoadMore={loadMore} />}
      {isModal && (
        <Modal onClose={closeModal} src={bigImage} alt={query}></Modal>
      )}
    </div>
  );
}

// export default App;
