'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var BRIEF_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAX_ROOMS = 5;
var MAX_GUESTS = 10;
var MIN_PIN_X = 300;
var MAX_PIN_X = 900;
var MIN_PIN_Y = 150;
var MAX_PIN_Y = 300;
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

// Создаёт объект с данными для одного объявления
function randomizeNums(maxNum) {
  for (var i = 0; i < maxNum; i++) {
    nums.push('0' + (i + 1));
  }

  return shuffleArray(nums);
}

var randomizedNums = randomizeNums(BRIEF_TITLES.length);

var getRandItem = function (array) {
  return array[countMinMax(0, array.length - 1)];
};

function createAdvertData(piece) {
  var author = 'img/avatars/user' + randomizedNums[piece] + '.png';
  var title = shuffleArray(BRIEF_TITLES)[piece];
  var rentPrice = countMinMax(MIN_PRICE, MAX_PRICE);
  var offerTypeRand = getRandItem(OFFER_TYPE);
  var roomAmount = countMinMax(1, MAX_ROOMS);
  var guestsAmount = countMinMax(1, MAX_GUESTS);
  var checkinTimeRand = getRandItem(CHECK_TIME);
  var checkoutTimeRand = getRandItem(CHECK_TIME);
  var description = '';
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var locationX = countMinMax(MIN_PIN_X, MAX_PIN_X) - PIN_WIDTH / 2;
  var locationY = countMinMax(MIN_PIN_Y, MAX_PIN_Y);

  shuffleArray(FEATURES);
  FEATURES.splice(0, countMinMax(0, FEATURES.length));

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
      features: FEATURES,
      description: description,
      photos: shuffleArray(PHOTOS),
      address: locationX + ', ' + locationY
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

// Заполняет пустой массив объектами с объявлениями
var getAdverts = function (array, amount) {
  for (var i = 0; i < amount.length; i++) {
    array.push(createAdvertData(i));
  }
};

getAdverts(adverts, BRIEF_TITLES);

// console.log(adverts);

// for (var i = 0; i < BRIEF_TITLES.length; i++) {
//   adverts.push(createAdvertData(i));
// }

// console.log(adverts[0].offer.features);
// console.log(adverts);

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
  var templateNode = document.querySelector('template');
  var pins = document.querySelector('.map__pins');
  var pin = templateNode.content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < BRIEF_TITLES.length; i++) {
    var card = templateNode.content.cloneNode(true);
    var button = card.querySelector('.map__pin');
    pin = renderPin(i, button);

    fragment.appendChild(pin);
  }
  pins.appendChild(fragment);
}

makePins();

// Создаем карточку с подробной информацией по объявлению из массива с объявлениями
var templateNode = document.querySelector('template');
var card = templateNode.content.cloneNode(true);
var cardItem = card.querySelector('.map__card');

// Меняем значения массива с типом жилья на аналогичные на русском языке для отображения в объявлении
var HOUSE_TYPE = {
  'palace': 'Дворец',
  'bungalo': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом'
};

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

var alterPiece = function (item, value) {
  item.textContent = value;

  return item;
};

var FEATURES_OBJ = {
  'wifi': card.querySelector('.popup__feature--wifi'),
  'dishwasher': card.querySelector('.popup__feature--dishwasher'),
  'parking': card.querySelector('.popup__feature--parking'),
  'washer': card.querySelector('.popup__feature--washer'),
  'elevator': card.querySelector('.popup__feature--elevator'),
  'conditioner': card.querySelector('.popup__feature--conditioner')
};

var emptyFeaturesBlock = cardBlocks.featuresBlock.cloneNode();
var fragment = document.createDocumentFragment();

function getAlternateArray(newArray, oldArray) {
  for (var i = 0; i < oldArray.length; i++) {
    fragment.appendChild(newArray[oldArray[i]]);
  }
  emptyFeaturesBlock.appendChild(fragment);

  return emptyFeaturesBlock;
}


var getPhotos = function (num) {
  var imgItem = cardBlocks.photosBlock.querySelector('img');
  cardBlocks.photosBlock.removeChild(imgItem);

  for (var i = 0; i < adverts[num].offer.photos.length; i++) {
    var imgClone = imgItem.cloneNode(true);
    imgClone.src = adverts[num].offer.photos[i];
    cardBlocks.photosBlock.appendChild(imgClone);
  }

  return cardBlocks.photosBlock;
};

function createCard(num) {
  alterPiece(cardBlocks.titleBlock, adverts[num].offer.title);
  alterPiece(cardBlocks.addressBlock, adverts[num].offer.address);
  alterPiece(cardBlocks.priceBlock, adverts[num].offer.price + '₽/ночь');
  alterPiece(cardBlocks.typeBlock, HOUSE_TYPE[adverts[num].offer.type]);
  alterPiece(cardBlocks.capacityBlock, adverts[num].offer.rooms + ' комнаты для ' + adverts[num].offer.guests + ' гостей');
  alterPiece(cardBlocks.checkBlock, 'Заезд после ' + adverts[num].offer.checkin + ', выезд до ' + adverts[num].offer.checkout);
  alterPiece(cardBlocks.descriptionBlock, adverts[num].offer.description);
  getAlternateArray(FEATURES_OBJ, adverts[num].offer.features);
  cardItem.replaceChild(emptyFeaturesBlock, cardBlocks.featuresBlock);
  cardBlocks.avatarBlock.src = adverts[num].author.avatar;
  getPhotos(num);

  return cardItem;
}

var map = document.querySelector('.map');
map.insertBefore(createCard(0), document.querySelector('.map__filters-container'));


