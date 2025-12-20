import openFullSizeImage from './bigPicture.js';
import renderPictures from './thumbnails.js';
import { fetchImages } from './api.js';
import { displayAlert } from './utils.js';
import { initUploadForm } from './uploadForm.js';


initUploadForm();


fetchImages()
  .then((photos) => {
    renderPictures(photos);
    document.querySelector('.pictures').addEventListener('click', (evt) => {
      const thumbnail = evt.target.closest('.picture');
      if (thumbnail) {
        evt.preventDefault();
        const photoId = parseInt(thumbnail.dataset.id, 10);
        const photoData = photos.find((photo) => photo.id === photoId);
        if (photoData) {
          openFullSizeImage(photoData);
        }
      }
    });
  })
  .catch((err) => {
    displayAlert(err.message);
  });


