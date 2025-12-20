const bigPictureModal = document.querySelector('.big-picture');
const closeModalButton = bigPictureModal.querySelector('.big-picture__cancel');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const likesCounter = bigPictureModal.querySelector('.likes-count');
const commentsCounter = bigPictureModal.querySelector('.comments-count');
const captionElement = bigPictureModal.querySelector('.social__caption');
const commentCountElement = bigPictureModal.querySelector('.social__comment-count');
const commentLoaderElement = bigPictureModal.querySelector('.comments-loader');
const imgElement = bigPictureModal.querySelector('.big-picture__img img');
const COMMENTS_BATCH_SIZE = 5;
let commentsList = [];
let displayedComments = 0;


const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.className = 'social__comment';

  comment.innerHTML = `
        <img class="social__picture"
             src="${avatar}"
             alt="${name}"
             width="35" height="35">
        <p class="social__text">${message}</p>
    `;
  return comment;
};


const refreshCounter = () => {
  const total = commentsList.length;
  commentCountElement.innerHTML = `${displayedComments} из <span class="comments-count">${total}</span> комментариев`;

  if (displayedComments >= total) {
    commentLoaderElement.classList.add('hidden');
  } else {
    commentLoaderElement.classList.remove('hidden');
  }
};


const displayCommentBatch = () => {
  const commentBatch = commentsList.slice(displayedComments, displayedComments + COMMENTS_BATCH_SIZE);

  commentBatch.forEach((item) => {
    commentsContainer.append(createComment(item));
  });

  displayedComments += commentBatch.length;

  refreshCounter();
};


const handleLoadButtonClick = () => {
  displayCommentBatch();
};


const closeFullSizeImage = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentLoaderElement.removeEventListener('click', handleLoadButtonClick);
  commentsList = [];
  displayedComments = 0;
};


function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    closeFullSizeImage();
  }
}


const openFullSizeImage = (photo) => {
  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  likesCounter.textContent = photo.likes;
  commentsCounter.textContent = photo.comments.length;
  captionElement.textContent = photo.description;
  commentsList = photo.comments;
  displayedComments = 0;
  commentsContainer.innerHTML = '';

  commentCountElement.classList.remove('hidden');
  commentLoaderElement.classList.remove('hidden');

  const totalCommentsEl = bigPictureModal.querySelector('.comments-count');
  totalCommentsEl.textContent = commentsList.length;

  displayCommentBatch();

  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentLoaderElement.addEventListener('click', handleLoadButtonClick);
};

closeModalButton.addEventListener('click', closeFullSizeImage);

export default openFullSizeImage;
