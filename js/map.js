'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPE_RUS = [];
var BRIEF_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
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
var adverts = [];

function countMinMax (min, max) {
  var minMaxRandom = min + Math.random() * (max - min);
  return Math.round(minMaxRandom);
};

function shuffleArrayCondition() {
  return Math.random() - 0.5;
};

function shuffleArray (array) {
  return array.sort(shuffleArrayCondition);
};


function createAdvertData (piece) {
  var advertItem;
  var author = 'img/avatars/user' + '0' + (piece + 1) + '.png';
  var rentPrice = countMinMax(MIN_PRICE, MAX_PRICE);
  var offerTypeRand = OFFER_TYPE[countMinMax(0, OFFER_TYPE.length - 1)];
  var roomAmount = countMinMax(1, MAX_ROOMS);
  var guestsAmount = countMinMax(1, MAX_GUESTS);
  var checkinTimeRand = CHECK_TIME[countMinMax(0, CHECK_TIME.length - 1)];
  var checkoutTimeRand = CHECK_TIME[countMinMax(0, CHECK_TIME.length - 1)];
  var description = '';
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var locationX = countMinMax(MIN_PIN_X, MAX_PIN_X) - PIN_WIDTH / 2;
  var locationY = countMinMax(MIN_PIN_Y, MAX_PIN_Y);

  FEATURES.length = countMinMax(0, FEATURES.length);

  return advertItem = {
    author: {
      avatar: author
    },
    offer: {
      title: BRIEF_TITLES[piece],
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
};

for (var i = 0; i < BRIEF_TITLES.length; i++) {
  adverts.push(createAdvertData(i));
}

console.log(adverts);



var renderPin = function (num, pin) {
  var img = pin.querySelector('img');

  pin.style.left = adverts[num].location.x + 'px';
  pin.style.top = adverts[num].location.y + 'px';
  img.src = adverts[num].author.avatar;
  img.alt = adverts[num].offer.title;

  return pin;
};

function makePins () {
  var templateNode = document.querySelector('template');
  var pins = document.querySelector('.map__pins');
  var pin = templateNode.content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (i = 0; i < BRIEF_TITLES.length; i++) {
    var card = templateNode.content.cloneNode(true);

    var button = card.querySelector('.map__pin');


    var pin = renderPin(i, button);
    fragment.appendChild(pin);
  }
  pins.appendChild(fragment);
};

makePins();

function createCard (num) {
  var templateNode = document.querySelector('template');
  var card = templateNode.content.cloneNode(true);
  var cardItem = card.querySelector('.map__card');

  var titleBlock = card.querySelector('.popup__title');
  titleBlock.textContent = adverts[num].offer.title;

  var addressBlock = card.querySelector('.popup__text--address');
  addressBlock.textContent = adverts[num].offer.address;

  var priceBlock = card.querySelector('.popup__text--price');
  priceBlock.textContent = adverts[num].offer.price + '₽/ночь';

  function changeTypeLang () {
    for (i = 0; i < BRIEF_TITLES.length; i++) {
      if (adverts[i].offer.type === 'palace') {
        adverts[i].offer.type = 'Дворец'; }
        else if (adverts[i].offer.type === 'house' ) {
          adverts[i].offer.type = 'Дом';
        }       else if (adverts[i].offer.type === 'flat' ) {
          adverts[i].offer.type = 'Квартира';
        }       else if (adverts[i].offer.type === 'bungalo' ) {
          adverts[i].offer.type = 'Бунгало';
        }
    }
  };

  var typeBlock = card.querySelector('.popup__type');
  changeTypeLang();
  typeBlock.textContent = adverts[num].offer.type;

  var capacityBlock = card.querySelector('.popup__text--capacity');
  capacityBlock.textContent = adverts[num].offer.rooms + ' комнаты для ' + adverts[num].offer.guests + ' гостей';

  var checkBlock = card.querySelector('.popup__text--time');
  checkBlock.textContent = 'Заезд после ' + adverts[num].offer.checkin + ', выезд до ' + adverts[num].offer.checkout;

  var featuresBlock = card.querySelector('.popup__features');
  var featureWifi = featuresBlock.querySelector('.popup__feature--wifi');
  var featureDishwasher = featuresBlock.querySelector('.popup__feature--dishwasher');
  var featureParking = featuresBlock.querySelector('.popup__feature--parking');
  var featureWasher = featuresBlock.querySelector('.popup__feature--washer');
  var featureElevator = featuresBlock.querySelector('.popup__feature--elevator');
  var featureConditioner = featuresBlock.querySelector('.popup__feature--conditioner');
  console.log(featuresBlock);

  for (i = 0; i < adverts[num].offer.features.length; i++) {
      featuresBlock.appendChild(featureWifi);
  featuresBlock.appendChild(featureDishwasher);
  featuresBlock.appendChild(featureParking);
  featuresBlock.appendChild(featureWasher);
  featuresBlock.appendChild(featureElevator);
  featuresBlock.appendChild(featureConditioner);
    console.log(adverts[num].offer.features[i]);
    if ((adverts[num].offer.features[i].includes('wifi'))) {
      featuresBlock.removeChild(featureWifi);
    } else if ((adverts[num].offer.features[i].includes('dishwasher'))) {
      featuresBlock.removeChild(featureDishwasher);
    } else if ((adverts[num].offer.features[i].includes('parking'))) {
      featuresBlock.removeChild(featureParking);
    } else if ((adverts[num].offer.features[i].includes('washer'))) {
      featuresBlock.removeChild(featureWasher);
    } else if ((adverts[num].offer.features[i].includes('elevator'))) {
      featuresBlock.removeChild(featureElevator);
    } else if ((adverts[num].offer.features[i].includes('conditioner'))) {
      featuresBlock.removeChild(featureConditioner);
    }


  }

// console.log(featureWifi);
  // featuresBlock.textContent = adverts[num].offer.features;

  var descriptionBlock = card.querySelector('.popup__description');
  descriptionBlock.textContent = adverts[num].offer.description;

  var avatarBlock = card.querySelector('.popup__avatar');
  avatarBlock.src = adverts[num].author.avatar;

  var photosBlock = card.querySelector('.popup__photos');
  var imgItem = photosBlock.querySelector('img');
  photosBlock.removeChild(imgItem);

  for (i = 0; i < adverts[num].offer.photos.length; i++) {
    var imgClone = imgItem.cloneNode(true);
    imgClone.src = adverts[num].offer.photos[i];
    photosBlock.appendChild(imgClone);
  }
  // console.log(photosBlock);
  // console.log(card);
  // console.log(cardItem);
  return cardItem;
};

// createCard(0);
// console.log(createCard(1));

var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
map.insertBefore(createCard(0), mapFilters);

console.log(map);
