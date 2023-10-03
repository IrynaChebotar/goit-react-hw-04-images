import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (page === 1) setImages([]); // Clear images on new query or initial load
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);
        if (!data.hits.length) return;
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) fetchData();
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLargeImageUrl('');
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length !== totalImages && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};
