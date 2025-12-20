const SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const imageInput = document.querySelector('#upload-file');
const previewImage = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const handleImageUpload = () => {
  const selectedFile = imageInput.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const isValidExtension = SUPPORTED_EXTENSIONS.some((extension) =>
    fileName.endsWith(extension)
  );

  if (isValidExtension) {
    const fileUrl = URL.createObjectURL(selectedFile);
    previewImage.src = fileUrl;
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${fileUrl})`;
    });
  }
};

export { handleImageUpload };
