import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './Container';
import Searchbar from './Searchbar';
import ImageGalleryInfo from './ImageGalleryInfo';

class App extends Component {
  state = {
    imageName: '',
  };

  handleSearchForm = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchForm} />
        <ImageGalleryInfo
          imageName={imageName}
          currentPage={this.props.currentPage}
        />
        <ToastContainer
          autoClose={2000}
          theme="colored"
          position="top-center"
        />
      </Container>
    );
  }
}

export default App;
