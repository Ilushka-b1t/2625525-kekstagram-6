const bigPictureModalElement = document.querySelector('.big-picture');
const closeModalButtonElement = document.querySelector('.big-picture__cancel');
const commentsCounterElement = bigPictureModalElement.querySelector('.social__comment-count');
const commentsLoadMoreButtonElement = bigPictureModalElement.querySelector('.comments-loader');
const commentsContainerElement = bigPictureModalElement.querySelector('.social__comments');

const COMMENTS_PER_PAGE = 5;
let displayedComments = [];
let visibleCommentsCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
        <img class="social__picture"
             src="${avatar}"
             alt="${name}"
             width="35" height="35">
        <p class="social__text">${message}</p>
    `;
  return commentElement;
};

const updateCommentsCounter = () => {
  const totalCommentsCount = displayedComments.length;
  commentsCounterElement.innerHTML = `${visibleCommentsCount} из <span class="comments-count">${totalCommentsCount}</span> комментариев`;

  if (visibleCommentsCount >= totalCommentsCount) {
    commentsLoadMoreButtonElement.classList.add('hidden');
  } else {
    commentsLoadMoreButtonElement.classList.remove('hidden');
  }
};

const renderComments = () => {
  const commentsPortion = displayedComments.slice(visibleCommentsCount, visibleCommentsCount + COMMENTS_PER_PAGE);

  commentsPortion.forEach((comment) => {
    commentsContainerElement.append(createCommentElement(comment));
  });

  visibleCommentsCount += commentsPortion.length;

  updateCommentsCounter();
};

const onLoadMoreCommentsClick = () => {
  renderComments();
};

export const openBigPictureModal = (photo) => {
  bigPictureModalElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureModalElement.querySelector('.big-picture__img img').alt = photo.description;
  bigPictureModalElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureModalElement.querySelector('.social__caption').textContent = photo.description;

  displayedComments = photo.comments;
  visibleCommentsCount = 0;
  commentsContainerElement.innerHTML = '';

  commentsCounterElement.classList.remove('hidden');
  commentsLoadMoreButtonElement.classList.remove('hidden');

  const totalCommentsCounterElement = bigPictureModalElement.querySelector('.comments-count');
  totalCommentsCounterElement.textContent = displayedComments.length;

  renderComments();

  bigPictureModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyDown);
  commentsLoadMoreButtonElement.addEventListener('click', onLoadMoreCommentsClick);
};

const closeBigPictureModal = () => {
  bigPictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentsLoadMoreButtonElement.removeEventListener('click', onLoadMoreCommentsClick);

  displayedComments = [];
  visibleCommentsCount = 0;
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPictureModal();
  }
}

closeModalButtonElement.addEventListener('click', closeBigPictureModal);
