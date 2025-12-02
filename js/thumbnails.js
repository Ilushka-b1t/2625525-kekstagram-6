import { getInformationPhotos } from './photosDataGeneration.js';

const renderPictures = () => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const photos = getInformationPhotos();
  const fragment = document.createDocumentFragment();

  container.querySelectorAll('.picture').forEach((pic) => pic.remove());

  photos.forEach(({ url, description, likes, comments }) => {
    const element = template.cloneNode(true);
    const picture = element.querySelector('.picture');

    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

export { renderPictures };
