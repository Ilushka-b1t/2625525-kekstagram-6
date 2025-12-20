import { createDebounce } from './util.js';
import renderPictures from './thumbnails.js';

const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const FILTERED_PICTURES_COUNT = 10;

const filterContainer = document.querySelector('.img-filters');
const activeButtonClass = 'img-filters__button--active';

let currentFilterType = FILTER.DEFAULT;
let allPictures = [];

const compareRandom = () => Math.random() - 0.5;

const compareByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

function clearPictures() {
  document.querySelectorAll('.picture').forEach((pictureElement) => {
    pictureElement.remove();
  });
}

function getSortedPictures() {
  const picturesCopy = [...allPictures];

  switch (currentFilterType) {
    case FILTER.RANDOM:
      return picturesCopy.sort(compareRandom).slice(0, FILTERED_PICTURES_COUNT);
    case FILTER.DISCUSSED:
      return picturesCopy.sort(compareByComments);
    default:
      return picturesCopy;
  }
}

function renderFilteredPictures() {
  clearPictures();
  const sortedPictures = getSortedPictures();
  renderPictures(sortedPictures);
}

const renderWithDebounce = createDebounce(renderFilteredPictures);

function handleFilterClick(event) {
  const clickedButton = event.target;

  if (!clickedButton.classList.contains('img-filters__button') ||
      clickedButton.id === currentFilterType) {
    return;
  }

  filterContainer.querySelector(`.${activeButtonClass}`).classList.remove(activeButtonClass);
  clickedButton.classList.add(activeButtonClass);

  currentFilterType = clickedButton.id;
  renderWithDebounce();
}

function setupFilters(loadedPictures) {
  allPictures = loadedPictures;
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', handleFilterClick);
}

export { setupFilters };
