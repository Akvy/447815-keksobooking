'use strict';

window.data = (function () {
//   var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
//   var BRIEF_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
//   var CHECK_TIME = ['12:00', '13:00', '14:00'];
//   var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
//   var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//   var randomizedNumbers = randomizeNumbers(BRIEF_TITLES.length);
//   var nums = [];

//   function countMinMax(min, max) {
//   var minMaxRandom = min + Math.random() * (max - min);
//   return Math.round(minMaxRandom);
// }

// function shuffleArrayCondition() {
//   return Math.random() - 0.5;
// }

// function shuffleArray(array) {
//   return array.sort(shuffleArrayCondition);
// }

//   function createAdvertData(piece) {
//     var author = 'img/avatars/user' + randomizedNumbers[piece] + '.png';
//     var title = shuffleArray(BRIEF_TITLES)[piece];
//     var rentPrice = countMinMax(MIN_PRICE, MAX_PRICE);
//     var offerTypeRand = getRandomItem(OFFER_TYPE);
//     var roomAmount = countMinMax(1, MAX_ROOMS);
//     var guestsAmount = countMinMax(1, MAX_GUESTS);
//     var checkinTimeRand = getRandomItem(CHECK_TIME);
//     var checkoutTimeRand = getRandomItem(CHECK_TIME);
//     var description = '';
//     var positionX = countMinMax(MIN_PIN_X, MAX_PIN_X);
//     var positionY = countMinMax(MIN_PIN_Y, MAX_PIN_Y);
//     var locationX = positionX + PIN_WIDTH / 2;
//     var locationY = positionY + PIN_HEIGHT;

//     return {
//       author: {
//         avatar: author
//       },
//       offer: {
//         title: title,
//         price: rentPrice,
//         type: offerTypeRand,
//         rooms: roomAmount,
//         guests: guestsAmount,
//         checkin: checkinTimeRand,
//         checkout: checkoutTimeRand,
//         features: FEATURES.slice(0, countMinMax(0, FEATURES.length)),
//         description: description,
//         photos: shuffleArray(PHOTOS),
//         address: locationX + ', ' + locationY
//       },
//       location: {
//         x: positionX,
//         y: positionY
//       }
//     };
//   }

//   function countMinMax(min, max) {
//   var minMaxRandom = min + Math.random() * (max - min);
//   return Math.round(minMaxRandom);
// }
// var getRandomItem = function (array) {
//   return array[countMinMax(0, array.length - 1)];
// };


//   function randomizeNumbers(maxNum) {
//     for (var i = 0; i < maxNum; i++) {
//       nums.push('0' + (i + 1));

//     }

//     return shuffleArray(nums);
//   }

//   function shuffleArrayCondition() {
//     return Math.random() - 0.5;
//   }

//   function shuffleArray(array) {
//     return array.sort(shuffleArrayCondition);
//   }

//   return {
//     BRIEF_TITLES,
//     createAdvertData: createAdvertData
//   };
})();
