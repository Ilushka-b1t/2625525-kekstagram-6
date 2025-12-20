import { getInformationPhotos } from './photosDataGeneration.js';
import { openBigPicture } from './bigPicture.js';

const renderPictures = () => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const photos = getInformationPhotos();
  const fragment = document.createDocumentFragment();

  container.querySelectorAll('.picture').forEach((pic) => pic.remove());

  photos.forEach((photo) => {
    const element = template.cloneNode(true);
    const picture = element.querySelector('.picture');
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').alt = photo.description;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;

    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });
    picture.dataset.id = photo.id;
    fragment.appendChild(element);
  });
  container.appendChild(fragment);
};

export default renderPictures;
