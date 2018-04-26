'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_PIN_X = 300;
var MAX_PIN_X = 900;
var MIN_PIN_Y = 150;
var MAX_PIN_Y = 300;
var HORIZONTAL_MIN = 0;
var VERTICAL_MIN = 150;
var VERTICAL_MAX = 500;
var templateNode = document.querySelector('template');
var card = templateNode.content.cloneNode(true);
var map = document.querySelector('.map');
var KEY_ENTER = 13;
var KEY_ESC = 27;
var INITIAL_PIN_HEIGHT = 22;
var initialButton = document.querySelector('.map__pin--main');
var inactiveMap = document.querySelector('.map');
var inactiveMapform = document.querySelector('.ad-form');
var filtersBar = document.querySelector('.map__filters');
var initialButtonImg = initialButton.querySelector('img');
var mainPinWidth = +initialButton.style.left.slice(0, -2) + initialButtonImg.offsetWidth / 2;
var mainPinHeight = +initialButton.style.top.slice(0, -2) + initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
var adverts = [];
var nums = [];

function countMinMax(min, max) {
  var minMaxRandom = min + Math.random() * (max - min);
  return Math.round(minMaxRandom);
}

function shuffleArrayCondition() {
  return Math.random() - 0.5;
}

function shuffleArray(array) {
  return array.sort(shuffleArrayCondition);
}

function renderServices(dom, services) {
  var elements = dom.querySelectorAll('li');

  for (var i = 0; i < elements.length; i++) {
    if (!services[i]) {
      elements[i].remove();
    }
  }
  return dom;
}

// Создаёт объект с данными для одного объявления
function randomizeNumbers(maxNum) {
  for (var i = 0; i < maxNum; i++) {
    nums.push('0' + (i + 1));
  }

  return shuffleArray(nums);
}

var randomizedNumbers = randomizeNumbers(window.data.BRIEF_TITLES.length);

var getRandomItem = function (array) {
  return array[countMinMax(0, array.length - 1)];
};

// Заполняет пустой массив объектами с объявлениями
var getAdverts = function (array, amount) {
  for (var i = 0; i < amount.length; i++) {
    array.push(window.data.createAdvertData(i));
  }
};

function pinClickHandler(num) {
  return function () {
    map.insertBefore(renderCard(num), document.querySelector('.map__filters-container'));

    var closeButton = document.querySelector('.popup__close');

    closeButton.addEventListener('click', closeButtonClickHandler);

    document.addEventListener('keydown', closeButtonKeydownHandler);
  };
}

function removeAdverts() {
  var maps = map.querySelectorAll('.map__card');

  for (var i = 0; i < maps.length; i++) {
    maps[i].remove();
  }

  return map;
}

// Создает метку для объявления
var renderPin = function (num, pin) {
  var img = pin.querySelector('img');

  pin.style.left = adverts[num].location.x + 'px';
  pin.style.top = adverts[num].location.y + 'px';
  img.src = adverts[num].author.avatar;
  img.alt = adverts[num].offer.title;

  pin.addEventListener('click', pinClickHandler(num));

  return pin;
};

// Создает метки для всех объявлений из массива
function makePins() {
  templateNode = document.querySelector('template');
  var pins = document.querySelector('.map__pins');
  var pin = templateNode.content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.BRIEF_TITLES.length; i++) {
    card = templateNode.content.cloneNode(true);
    var button = card.querySelector('.map__pin');
    pin = renderPin(i, button);

    fragment.appendChild(pin);
  }
  pins.appendChild(fragment);
}

// Создаем карточку с подробной информацией по объявлению из массива с объявлениями
function renderCard(num) {
  templateNode = document.querySelector('template');
  card = templateNode.content.cloneNode(true);
  var cardItem = card.querySelector('.map__card');
  var cardBlocks = {
    titleBlock: card.querySelector('.popup__title'),
    addressBlock: card.querySelector('.popup__text--address'),
    priceBlock: card.querySelector('.popup__text--price'),
    typeBlock: card.querySelector('.popup__type'),
    capacityBlock: card.querySelector('.popup__text--capacity'),
    checkBlock: card.querySelector('.popup__text--time'),
    featuresBlock: card.querySelector('.popup__features'),
    descriptionBlock: card.querySelector('.popup__description'),
    avatarBlock: card.querySelector('.popup__avatar'),
    photosBlock: card.querySelector('.popup__photos')
  };
  var imgItem = cardBlocks.photosBlock.querySelector('img');
  var photos = adverts[num].offer.photos;

  removeAdverts();
  cardBlocks.photosBlock.removeChild(imgItem);

  for (var i = 0; i < photos.length; i++) {
    var imgClone = imgItem.cloneNode(true);
    imgClone.src = photos[i];
    cardBlocks.photosBlock.appendChild(imgClone);
  }

  cardBlocks.avatarBlock.src = adverts[num].author.avatar;
  cardBlocks['titleBlock'].textContent = adverts[num].offer.title;
  cardBlocks['addressBlock'].textContent = adverts[num].offer.address;
  cardBlocks['priceBlock'].textContent = adverts[num].offer.price + '₽/ночь';
  cardBlocks['typeBlock'].textContent = window.data.HOUSE_TYPE[adverts[num].offer.type];
  cardBlocks['capacityBlock'].textContent = adverts[num].offer.rooms + ' комнаты для ' + adverts[num].offer.guests + ' гостей';
  cardBlocks['checkBlock'].textContent = 'Заезд после ' + adverts[num].offer.checkin + ', выезд до ' + adverts[num].offer.checkout;
  cardBlocks['descriptionBlock'].textContent = adverts[num].offer.description;

  renderServices(cardBlocks.featuresBlock, adverts[num].offer.features);

  return cardItem;
}

getAdverts(adverts, window.data.BRIEF_TITLES);
makePins();

// Выполняем условия неактивного состояния страницы

var fieldsets = document.querySelectorAll('fieldset');
var pins = document.querySelectorAll('.map__pin');
var typeSelect = document.getElementById('type');
var priceInput = document.getElementById('price');
var capacitySelect = document.getElementById('capacity');

var setInactiveForm = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }

  for (i = 1; i < pins.length; i++) {
    pins[i].style.display = 'none';
  }

  filtersBar.style.display = 'none';
  priceInput.setAttribute('min', '1000');
  priceInput.placeholder = '1 000';
  window.form.addressInput.value = mainPinWidth + ', ' + mainPinHeight;

  window.form.disableCapacityOptions();

  capacitySelect.selectedIndex = 2;
  capacitySelect.children[2].removeAttribute('disabled', '');
};

setInactiveForm();

var removeDisabledAttr = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled', '');
  }
};

function initialButtonMouseupHandler() {
  inactiveMap.classList.remove('map--faded');
  inactiveMapform.classList.remove('ad-form--disabled');
  filtersBar.classList.remove('visually-hidden');

  removeDisabledAttr(fieldsets);

  for (var i = 1; i < pins.length; i++) {
    pins[i].style.display = 'block';
  }

  filtersBar.style.display = 'flex';
}

function initialButtonKeydownHandler(evt) {
  if (evt.keyCode === KEY_ENTER) {
    initialButtonMouseupHandler();
  }
}

// Вешаем обработчик событий на кнопку с пирожком для активтого состояния
initialButton.addEventListener('mouseup', initialButtonMouseupHandler);

initialButton.addEventListener('keydown', initialButtonKeydownHandler);

function closeButtonClickHandler() {
  var openedCard = document.querySelector('.map__card');

  openedCard.classList.add('visually-hidden');
}

function closeButtonKeydownHandler(evt) {
  if (evt.keyCode === KEY_ESC) {
    closeButtonClickHandler();
  }
}

var roomsSelect = document.getElementById('room_number');

initialButton.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var offsetXY = map.getBoundingClientRect();

  var startCoords = {
    x: evt.clientX - offsetXY.left,
    y: evt.clientY - offsetXY.top
  };

  var initialButtonMousemoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - (moveEvt.clientX - offsetXY.left),
      y: startCoords.y - (moveEvt.clientY - offsetXY.top)
    };
    var offsetX = initialButtonImg.offsetWidth / 2;
    var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
    var pinCurrentX = moveEvt.clientX - shift.x - offsetXY.left - offsetX;
    var pinCurrentY = moveEvt.clientY - shift.y - offsetXY.top - offsetY / 2;
    var posXY = tracePinPen(pinCurrentX, pinCurrentY);

    startCoords = {
      x: moveEvt.clientX - offsetXY.left,
      y: moveEvt.clientY - offsetXY.top
    };

    initialButton.style.left = posXY.x + 'px';
    initialButton.style.top = posXY.y + 'px';

    window.form.addressInput.value = posXY.x + offsetX + ', ' + (posXY.y + offsetY);
  };

  function tracePinPen(x, y) {
    var mapWidth = map.offsetWidth;
    var pinOffsetX = initialButtonImg.offsetWidth;
    var posX = x;
    var posY = y;
    var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
    var pinOffsetY = VERTICAL_MAX - offsetY;

    if (x < HORIZONTAL_MIN) {
      posX = HORIZONTAL_MIN;
    }

    if (x > mapWidth - pinOffsetX) {
      posX = mapWidth - pinOffsetX;
    }

    if (y < VERTICAL_MIN) {
      posY = VERTICAL_MIN;
    }

    if (y > pinOffsetY) {
      posY = pinOffsetY;
    }
    return {x: parseInt(posX, 10), y: parseInt(posY, 10)};
  }

  var initialButtonMouseupMoveHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', initialButtonMousemoveHandler);
    document.removeEventListener('mouseup', initialButtonMouseupMoveHandler);
  };

  document.addEventListener('mousemove', initialButtonMousemoveHandler);
  document.addEventListener('mouseup', initialButtonMouseupMoveHandler);
});
