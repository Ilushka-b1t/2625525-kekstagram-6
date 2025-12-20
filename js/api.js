const API_BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Endpoint = {
  IMAGES: '/data',
  UPLOAD: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
  FETCH_IMAGES: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  UPLOAD_IMAGE: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const request = (endpoint, errorMessage, method = HttpMethod.GET, payload = null) =>
  fetch(`${API_BASE_URL}${endpoint}`, { method, body: payload })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const fetchImages = () => request(Endpoint.IMAGES, ErrorMessage.FETCH_IMAGES);

const uploadImage = (payload) =>
  request(Endpoint.UPLOAD, ErrorMessage.UPLOAD_IMAGE, HttpMethod.POST, payload);

export { fetchImages, uploadImage };
