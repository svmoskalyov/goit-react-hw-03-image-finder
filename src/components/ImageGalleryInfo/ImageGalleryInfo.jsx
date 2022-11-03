import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import LoaderComponent from '../Loader';
import pixabayAPI from '../../services/pixabayApi';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGalleryInfo extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    error: null,
    currentPage: 1,
  };

  static propTypes = {
    imageName: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;

    if (prevName !== nextName) {
      this.setState({ images: [], currentPage: 1 });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.searchMoreImages(nextName, nextPage);
    }
  }

  searchMoreImages(nextName, nextPage) {
    this.setState({ status: Status.PENDING });

    pixabayAPI
      .fetchImage(nextName, nextPage)
      .then(images => {
        if (images.total === 0) {
          toast.info('No images found. Please submit another query!');
          this.setState({ status: Status.REJECTED });

          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        setTimeout(() => {
          window.scrollBy({
            top: 500,
            behavior: 'smooth',
          });
        }, 500);
      });
  }

  onClickLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <>
        {images.length > 0 && (
          <div>
            <ImageGallery images={images} />
            <Button onClickLoadMore={this.onClickLoadMore} />
          </div>
        )}

        {status === Status.PENDING && (
          <div>
            <LoaderComponent />
          </div>
        )}
        {status === Status.REJECTED && null}
      </>
    );
  }
}

export default ImageGalleryInfo;
