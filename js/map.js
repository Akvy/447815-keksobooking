'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var BRIEF_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAX_ROOMS = 5;
var MAX_GUESTS = 10;
var MIN_PIN_X = 300;
var MAX_PIN_X = 900;
var MIN_PIN_Y = 150;
var MAX_PIN_Y = 300;
var HOUSE_TYPE = {
  'palace': 'Дворец',
  'bungalo': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом'
};
var templateNode = document.querySelector('template');
var card = templateNode.content.cloneNode(true);
var map = document.querySelector('.map');
var KEY_ENTER = 13;
var KEY_ESC = 27;
var INITIAL_PIN_HEIGHT = 22;
var initialButton = document.querySelector('.map__pin--main');
var inactiveMap = document.querySelector('.map');
var inactiveMapform = document.querySelector('.ad-form');
// var advertCard = document.querySelector('.map__card');
var filtersBar = document.querySelector('.map__filters');
var initialButtonImg = initialButton.querySelector('img');
var addressInput = document.getElementById('address');
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

var randomizedNumbers = randomizeNumbers(BRIEF_TITLES.length);

var getRandomItem = function (array) {
  return array[countMinMax(0, array.length - 1)];
};

function createAdvertData(piece) {
  var author = 'img/avatars/user' + randomizedNumbers[piece] + '.png';
  var title = shuffleArray(BRIEF_TITLES)[piece];
  var rentPrice = countMinMax(MIN_PRICE, MAX_PRICE);
  var offerTypeRand = getRandomItem(OFFER_TYPE);
  var roomAmount = countMinMax(1, MAX_ROOMS);
  var guestsAmount = countMinMax(1, MAX_GUESTS);
  var checkinTimeRand = getRandomItem(CHECK_TIME);
  var checkoutTimeRand = getRandomItem(CHECK_TIME);
  var description = '';
  var positionX = countMinMax(MIN_PIN_X, MAX_PIN_X);
  var positionY = countMinMax(MIN_PIN_Y, MAX_PIN_Y);
  var locationX = positionX + PIN_WIDTH / 2;
  var locationY = positionY + PIN_HEIGHT;

  return {
    author: {
      avatar: author
    },
    offer: {
      title: title,
      price: rentPrice,
      type: offerTypeRand,
      rooms: roomAmount,
      guests: guestsAmount,
      checkin: checkinTimeRand,
      checkout: checkoutTimeRand,
      features: FEATURES.slice(0, countMinMax(0, FEATURES.length)),
      description: description,
      photos: shuffleArray(PHOTOS),
      address: locationX + ', ' + locationY
    },
    location: {
      x: positionX,
      y: positionY
    }
  };
}

// Заполняет пустой массив объектами с объявлениями
var getAdverts = function (array, amount) {
  for (var i = 0; i < amount.length; i++) {
    array.push(createAdvertData(i));
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

  for (var i = 0; i < BRIEF_TITLES.length; i++) {
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
  cardBlocks['typeBlock'].textContent = HOUSE_TYPE[adverts[num].offer.type];
  cardBlocks['capacityBlock'].textContent = adverts[num].offer.rooms + ' комнаты для ' + adverts[num].offer.guests + ' гостей';
  cardBlocks['checkBlock'].textContent = 'Заезд после ' + adverts[num].offer.checkin + ', выезд до ' + adverts[num].offer.checkout;
  cardBlocks['descriptionBlock'].textContent = adverts[num].offer.description;

  renderServices(cardBlocks.featuresBlock, adverts[num].offer.features);

  return cardItem;
}

getAdverts(adverts, BRIEF_TITLES);
makePins();

// Выполняем условия неактивного состояния страницы

var fieldsets = document.querySelectorAll('fieldset');
var pins = document.querySelectorAll('.map__pin');
var typeSelect = document.getElementById('type');
var priceInput = document.getElementById('price');
var capacitySelect = document.getElementById('capacity');

var setMinPrice = function (num, minPrice, placeHolder) {
  if (typeSelect.selectedIndex === num) {
    priceInput.setAttribute('min', minPrice);
    priceInput.placeholder = placeHolder;
  }
};

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
  addressInput.value = mainPinWidth + ', ' + mainPinHeight;

  for (i = 0; i < capacitySelect.children.length; i++) {
    capacitySelect.children[i].setAttribute('disabled', '');
  }

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

// Обработчик событий на инпут с ценой и селектом выбора типа жилья
typeSelect.addEventListener('change', function () {
  setMinPrice(0, '1000', '1 000');
  setMinPrice(1, '0', '0');
  setMinPrice(2, '5000', '5 000');
  setMinPrice(3, '10000', '10 000');
});

var timeInSelect = document.getElementById('timein');
var timeOutSelect = document.getElementById('timeout');

timeOutSelect.addEventListener('change', function () {

  timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
});

timeInSelect.addEventListener('change', function () {

  timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
});


var roomsSelect = document.getElementById('room_number');

var disableCapacityOptions = function (num) {
  for (var i = 0; i < capacitySelect.children.length; i++) {
    capacitySelect.children[i].setAttribute('disabled', '');
  }

  capacitySelect.selectedIndex = num;
};

var addCapacityOption = function (from, to) {
  for (var i = from; i <= to; i++) {
    capacitySelect.children[i].removeAttribute('disabled', '');
  }
};

roomsSelect.addEventListener('change', function (evt) {
  var target = evt.target;

  if (!target.selectedIndex) {
    disableCapacityOptions(2);
    addCapacityOption(2, 2);
  }

  if (target.selectedIndex === 1) {
    disableCapacityOptions(1);
    addCapacityOption(1, 2);
  }

  if (target.selectedIndex === 2) {
    disableCapacityOptions(0);
    addCapacityOption(0, 2);
  }

  if (target.selectedIndex === 3) {
    disableCapacityOptions(3);
    addCapacityOption(3, 3);
  }
});

var adForm = document.querySelector('.ad-form');
var successWindow = document.querySelector('.success');

adForm.addEventListener('submit', function () {
  successWindow.classList.remove('hidden');
});
