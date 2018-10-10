import React, { Component } from 'react';
import axios from 'axios';

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;


class UploadImage extends Component {

  constructor() {
    super();
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event.target.files);
    const imagePath = event.target.files[0];
    const formData = new FormData();
    formData.append('file', imagePath);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    axios.post(CLOUDINARY_URL, formData)
    .then((res) => {
      console.log(res.data.url);
      this.setState({ image: res.data.url })
    }).catch(error => console.log(error));
  }

  render() {
    const { image } = this.state;
    return (
      <div className="card">
        <label className="file-upload-container" htmlFor="file-upload">
          <input id="file-upload" 
            type="file"
            name="imageUrl"
            className='imgInput'
            onChange={ this.handleChange }
          />
          Upload an Image
        </label>
        <img src={ image } className='img-prev' alt='ima' />
      </div>
    )
  }
}

export default UploadImage;
