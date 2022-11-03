import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images }) => (
  <ul className={styles.ImageGallery}>
    {images &&
      images.map(({ webformatURL, tags, largeImageURL, id }) => (
        <ImageGalleryItem
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          key={id}
        />
      ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
