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

// Создает метку для объявления
var renderPin = function (num, pin) {
  var img = pin.querySelector('img');

  pin.style.left = adverts[num].location.x + 'px';
  pin.style.top = adverts[num].location.y + 'px';
  img.src = adverts[num].author.avatar;
  img.alt = adverts[num].offer.title;

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
  var imgItem = cardBlocks.photosBlock.querySelector('img');
  var photos = adverts[num].offer.photos;

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

var map = document.querySelector('.map');
map.insertBefore(renderCard(0), document.querySelector('.map__filters-container'));



// Выполняем условия неактивного состояния страницы
var fieldsets = document.querySelectorAll('fieldset');
var pins = document.querySelectorAll('.map__pin');
// console.log(pins);

for (var i = 0; i < fieldsets.length; i++ ) {

  var fieldset = document.querySelector('fieldset');
  fieldsets[i].setAttribute('disabled', '');
}

for (i = 1; i < pins.length; i++) {
  pins[i].classList.add('visually-hidden');
}



// Вешаем обработчик событий на кнопку с пирожком для активтого состояния

var initialButton = document.querySelector('.map__pin--main');
var inactiveMap = document.querySelector('.map');
var inactiveMapform = document.querySelector('.ad-form');
var advertCard = document.querySelector('.map__card');
var filtersBar = document.querySelector('.map__filters');
var INITIAL_PIN_HEIGHT = 22;
var initialButtonImg = initialButton.querySelector('img');
var addressInput = document.getElementById('address');
var mainPinWidth = +initialButton.style.left.slice(0, -2) + initialButtonImg.offsetWidth / 2;
var mainPinHeight = +initialButton.style.top.slice(0, -2) + initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;

advertCard.classList.add('visually-hidden');
filtersBar.classList.add('visually-hidden');

var initialButtonMouseupHandler = function () {
  inactiveMap.classList.remove('map--faded');
  inactiveMapform.classList.remove('ad-form--disabled');
  filtersBar.classList.remove('visually-hidden');

  for (var i = 0; i < fieldsets.length; i++ ) {
    var fieldset = document.querySelector('fieldset');
    fieldsets[i].removeAttribute('disabled', '');
  }

  for (i = 1; i < pins.length; i++) {
    pins[i].classList.remove('visually-hidden');
  }

  addressInput.value = mainPinWidth + ', ' + mainPinHeight;

  initialButton.removeEventListener('mouseup', initialButtonMouseupHandler);
};

var initialButtonKeydownHandler = function (evt) {
  if (evt.keyCode === 13) {
    initialButtonMouseupHandler();
  }

  initialButton.removeEventListener('keydown', initialButtonKeydownHandler);
};

initialButton.addEventListener('mouseup', initialButtonMouseupHandler);

initialButton.addEventListener('keydown', initialButtonKeydownHandler);

  var pins1MouseupHandler = function () {

    map.replaceChild(renderCard(1), cardItem);
    renderServices(cardBlocks.featuresBlock, adverts[1].offer.features);
    // cardBlocks.featuresBlock = adverts[1].offer.features;
    var img = cardItem.querySelector('img');
    var imgPin = pins[1].querySelector('img');
    img.src = imgPin.src;
    // renderServices(cardBlocks.featuresBlock, adverts[1].offer.features);
    // console.log(adverts[1].offer.features);

    if (advertCard.classList.contains('visually-hidden')) {
      advertCard.classList.remove('visually-hidden');
    } else {
      advertCard.classList.add('visually-hidden');
    }

    // pins[1].removeEventListener('mouseup', pins1MouseupHandler);

  };

  var pins1KeydownHandler  = function (evt) {
    if (evt.keyCode === 13) {
      pins1MouseupHandler();
    }
  };

  var pins2MouseupHandler = function () {

    map.replaceChild(renderCard(2), cardItem);
    renderServices(cardBlocks.featuresBlock, adverts[2].offer.features);


    // cardBlocks.featuresBlock = adverts[1].offer.features;
    var img = cardItem.querySelector('img');
    var imgPin = pins[2].querySelector('img');
    img.src = imgPin.src;
    // renderServices(cardBlocks.featuresBlock, adverts[2].offer.features);
    // console.log(adverts[2].offer.features, cardBlocks.featuresBlock);

    if (advertCard.classList.contains('visually-hidden')) {
      advertCard.classList.remove('visually-hidden');
    } else {
      advertCard.classList.add('visually-hidden');
    }
  };

  var pins2KeydownHandler  = function (evt) {
    if (evt.keyCode === 13) {
      pins1MouseupHandler();
    }
  };

console.log(renderCard(0),renderCard(1),renderCard(2))

pins[1].addEventListener('mouseup', pins1MouseupHandler);

pins[1].addEventListener('keydown', pins1KeydownHandler);

pins[2].addEventListener('mouseup', pins2MouseupHandler);

pins[2].addEventListener('keydown', pins2KeydownHandler);


console.log(adverts);


// console.log(cardItem);

// map.replaceChild(renderCard(3), cardItem);

// console.log(cardItem);
