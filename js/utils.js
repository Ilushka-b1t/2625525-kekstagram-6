function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomNumber };


const ALERT_SHOW_TIME = 5000;

export function displayAlert(message) {
  const alertElement = document.createElement('div');
  alertElement.textContent = message;
  alertElement.style.position = 'absolute';
  alertElement.style.zIndex = '100';
  alertElement.style.top = '0';
  alertElement.style.left = '0';
  alertElement.style.right = '0';
  alertElement.style.padding = '10px 3px';
  alertElement.style.fontSize = '30px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = 'red';
  alertElement.style.color = 'white';
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
}


export function createDebounce(callbackFunction, delay = 500) {
  let timerId;

  return (...argumentsList) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callbackFunction.apply(this, argumentsList), delay);
  };
}
