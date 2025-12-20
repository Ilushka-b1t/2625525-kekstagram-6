import openFullSizeImage from './bigPicture.js';
import renderPictures from './thumbnails.js';
import { fetchImages } from './api.js';
import { displayAlert } from './utils.js';
import { initUploadForm } from './uploadForm.js';
import { setupFilters } from './filter.js';


let currentPhotos = [];

initUploadForm();


fetchImages()
  .then((photos) => {
    currentPhotos = photos;
    renderPictures(photos);
    setupFilters(photos);
    document.querySelector('.pictures').addEventListener('click', (evt) => {
      const thumbnail = evt.target.closest('.picture');
      if (thumbnail) {
        evt.preventDefault();
        const photoId = parseInt(thumbnail.dataset.id, 10);
        const photoData = currentPhotos.find((photo) => photo.id === photoId);
        if (photoData) {
          openFullSizeImage(photoData);
        }
      }
    });
  })
  .catch((err) => {
    displayAlert(err.message);
  });
