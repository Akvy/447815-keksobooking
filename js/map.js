'use strict';

var briefTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var checkinList = ['12:00', '13:00', '14:00'];
var checkoutList = ['12:00', '13:00', '14:00'];
var adverts = [];

var countMinMax = function (min, max) {
  var MinMaxRandom = min + Math.random() * (max - min);
  return Math.round(MinMaxRandom);
};


function compareRandom() {
  return Math.random() - 0.5;
}


var createAdvertData = function (piece) {
  var advertItem = {};
  advertItem['author'] = {};
  advertItem.author['avatar'] = 'img/avatars/user' + '0' + (piece + 1) + '.png';
  advertItem['offer'] = {};
  advertItem.offer['title'] = briefTitles[piece];
  advertItem.offer['price'] = countMinMax(1000, 1000000);
  advertItem.offer['type'] = offerTypes[countMinMax(0, offerTypes.length - 1)];
  advertItem.offer['rooms'] = countMinMax(1, 5);
  advertItem.offer['guests'] = countMinMax(1, 10);
  advertItem.offer['checkin'] = checkinList[countMinMax(0, checkinList.length - 1)];
  advertItem.offer['checkout'] = checkoutList[countMinMax(0, checkoutList.length - 1)];
  advertItem.offer['features'] = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  advertItem.offer.features.length = countMinMax(0, 6);
  advertItem.offer.description = '';
  advertItem.offer.photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  advertItem.offer.photos.sort(compareRandom);
  advertItem.location = {};
  advertItem.location.x = countMinMax(300, 900);
  advertItem.location.y = countMinMax(150, 300);
  advertItem.offer['adress'] = [advertItem.location.x, advertItem.location.y];

  return advertItem;
};

for (var i = 0; i < briefTitles.length; i++) {
  createAdvertData(i);
  adverts.push(createAdvertData(i));
}

var templatePin = document.querySelector('.map__pin');
var pin = templatePin.cloneNode(true);
var pins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var renderPin = function (num) {
  pin.style.left = (adverts[num].location.x - templatePin.offsetWidth / 2) + 'px';
  pin.style.top = (adverts[num].location.y - templatePin.offsetHeight - 22) + 'px';
  pin.children[0].src = adverts[num].author.avatar;
  pin.children[0].alt = adverts[num].offer.title;

  return pin;
};

for (i = 0; i < briefTitles.length; i++) {
  renderPin(i);
  fragment.appendChild(renderPin(i));
  // console.log(fragment.appendChild(renderPin(i)));
}

// console.log(adverts);

// console.log(renderPin(2));

pins.appendChild(fragment);

// console.log(pins);
// console.log(fragment.appendChild(renderPin(2)));

// Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
