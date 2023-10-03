import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryContainer } from './ImageGallery.styled';

export const ImageGallery = ({ images, onItemClick }) => (
  <GalleryContainer>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        imageUrl={image.webformatURL}
        onClick={() => onItemClick(image.largeImageURL)}
      />
    ))}
  </GalleryContainer>
);
