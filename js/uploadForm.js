import { resetImageSettings } from './photoEffects.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './message.js';


const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

const ButtonText = {
  IDLE: 'Опубликовать',
  PROCESSING: 'Публикую...'
};


const filePicker = document.getElementById('upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const pageBody = document.body;
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');


const validator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


function parseHashtags(value) {
  return value.trim().split(' ').filter((tag) => tag.trim().length);
}

function checkHashtagFormat(value) {
  if (value.length === 0) {
    return true;
  }
  const hashtags = parseHashtags(value);
  return hashtags.every((tag) => HASHTAG_PATTERN.test(tag));
}

function checkHashtagCount(value) {
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAGS;
}

function checkHashtagUniqueness(value) {
  const hashtags = parseHashtags(value);
  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
}

function checkCommentLength(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}


validator.addValidator(hashtagsInput, checkHashtagFormat, 'Хэштег должен начинаться с # и содержать только буквы и цифры (макс. 20 символов)');
validator.addValidator(hashtagsInput, checkHashtagCount, `Разрешено не более ${MAX_HASHTAGS} хэштегов`);
validator.addValidator(hashtagsInput, checkHashtagUniqueness, 'Хэштеги не могут повторяться');
validator.addValidator(commentInput, checkCommentLength, `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`);


function openUploadModal() {
  uploadModal.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', handleDocumentKeydown);
}

function closeUploadModal() {
  uploadModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);

  resetImageSettings();
  resetForm();
}

function resetForm() {
  uploadForm.reset();
  validator.reset();
  filePicker.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  enableSubmitButton();
}

function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = ButtonText.PROCESSING;
}

function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = ButtonText.IDLE;
}


function onFileChange() {
  if (filePicker.files.length) {
    openUploadModal();
  }
}

function onCancelClick(event) {
  event.preventDefault();
  closeUploadModal();
}

function handleDocumentKeydown(event) {
  if (event.key === 'Escape') {
    const activeElement = document.activeElement;
    const isTextFocused = activeElement === hashtagsInput || activeElement === commentInput;
    const hasErrorMessage = document.querySelector('.error');

    if (!isTextFocused && !hasErrorMessage) {
      event.preventDefault();
      closeUploadModal();
    }
  }
}

function stopEscapePropagation(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const isValid = validator.validate();
  if (isValid) {
    disableSubmitButton();
    sendData(new FormData(event.target))
      .then(() => {
        closeUploadModal();
        showSuccess();
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        enableSubmitButton();
      });
  }
}


function initUploadForm() {
  filePicker.addEventListener('change', onFileChange);
  cancelButton.addEventListener('click', onCancelClick);
  hashtagsInput.addEventListener('keydown', stopEscapePropagation);
  commentInput.addEventListener('keydown', stopEscapePropagation);
  uploadForm.addEventListener('submit', handleFormSubmit);
}

export { initUploadForm };
