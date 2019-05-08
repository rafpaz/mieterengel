import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Spinner from './components/Spinner';
import Images from './components/Images';
import Buttons from './components/Buttons';
import Footer from './components/Footer';
import './App.css';

const toastColor = {
  background: '#505050',
  text: '#fff',
};

export default class App extends Component {
  state = {
    uploading: false,
    images: [],
  };

  toast = notify.createShowQueue();

  onChange = (e) => {
    const errs = [];
    const files = Array.from(e.target.files);

    if (files.length !== 1) {
      const msg = 'Only 1 image can be uploaded at a time';
      return this.toast(msg, 'custom', 2000, toastColor);
    }
    const [file] = files;
    const formData = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    if (types.every(type => file.type !== type)) {
      errs.push(`'${file.type}' is not a supported format`);
    }

    if (file.size > 150000) {
      errs.push(`'${file.name}' is too large, please pick a smaller file`);
    }

    formData.append(0, file);

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor));
    }

    this.setState({ uploading: true });

    fetch('/api/uploadImage', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((images) => {
        this.setState({
          uploading: false,
          images,
        });
      })
      .catch((err) => {
        err.json().then((e) => {
          this.toast(e.message, 'custom', 2000, toastColor);
          this.setState({ uploading: false });
        });
      });
  };

  filter = id => this.state.images.filter(image => image.public_id !== id)

  removeImage = (id) => {
    this.setState({ images: this.filter(id) });
  }

  onError = (id) => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor);
    this.setState({ images: this.filter(id) });
  }

  render() {
    const { uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return (
            <Images
              images={images}
              removeImage={this.removeImage}
              onError={this.onError}
            />
          );
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    return (
      <div className="container">
        <Notifications />
        <div className="buttons">
          {content()}
        </div>
        <Footer />
      </div>
    );
  }
}
