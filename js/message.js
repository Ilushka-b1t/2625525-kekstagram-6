const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

function openMessage(template, closeButtonSelector) {
  const messageElement = template.cloneNode(true);
  const closeButton = messageElement.querySelector(closeButtonSelector);

  document.body.append(messageElement);

  function hideMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onEscapePress);
    document.removeEventListener('click', onBackgroundClick);
  }

  function onEscapePress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hideMessage();
    }
  }

  function onBackgroundClick(evt) {
    if (evt.target === messageElement) {
      hideMessage();
    }
  }

  closeButton.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onEscapePress);
  document.addEventListener('click', onBackgroundClick);
}

function showSuccess() {
  openMessage(successTemplate, '.success__button');
}

function showError() {
  openMessage(errorTemplate, '.error__button');
}

export { showSuccess, showError };
