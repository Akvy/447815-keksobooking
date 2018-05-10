'use strict';

(function () {
  var HOUSE_TYPE = {
    'palace': 'Дворец',
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом'
  };
  var domElements = window.domElements.getDomElements();

  function renderServices(services, possibleServices) {
    var elements = services.querySelectorAll('li');
    var getClassNameFeatures = possibleServices.map(function (element) {
      return 'popup__feature--' + element;
    });
    for (var i = 0; i < elements.length; i++) {
      var existsClass = getClassNameFeatures.some(function (element1) {
        return elements[i].classList.contains(element1);
      });

      if (!existsClass) {
        elements[i].remove();
      }
    }
  }

  function removeAdverts() {
    var cards = domElements.map.querySelectorAll('.map__card');

    cards.forEach(function (elem) {
      elem.remove();
    });
  }

  window.renderCard = function (element) {
    var templateClone = document.querySelector('template');
    var cardClone = templateClone.content.cloneNode(true);
    var cardItem = cardClone.querySelector('.map__card');
    var cardBlocks = {
      titleBlock: cardClone.querySelector('.popup__title'),
      addressBlock: cardClone.querySelector('.popup__text--address'),
      priceBlock: cardClone.querySelector('.popup__text--price'),
      typeBlock: cardClone.querySelector('.popup__type'),
      capacityBlock: cardClone.querySelector('.popup__text--capacity'),
      checkBlock: cardClone.querySelector('.popup__text--time'),
      featuresBlock: cardClone.querySelector('.popup__features'),
      descriptionBlock: cardClone.querySelector('.popup__description'),
      avatarBlock: cardClone.querySelector('.popup__avatar'),
      photosBlock: cardClone.querySelector('.popup__photos')
    };
    var imageItem = cardBlocks.photosBlock.querySelector('img');
    var photos = element.offer.photos;

    removeAdverts();
    cardBlocks.photosBlock.removeChild(imageItem);

    for (var i = 0; i < photos.length; i++) {
      var imageClone = imageItem.cloneNode(true);
      imageClone.src = photos[i];
      cardBlocks.photosBlock.appendChild(imageClone);
    }

    cardBlocks.avatarBlock.src = element.author.avatar;
    cardBlocks['titleBlock'].textContent = element.offer.title;
    cardBlocks['addressBlock'].textContent = element.offer.address;
    cardBlocks['priceBlock'].textContent = element.offer.price + '₽/ночь';
    cardBlocks['typeBlock'].textContent = HOUSE_TYPE[element.offer.type];
    cardBlocks['capacityBlock'].textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    cardBlocks['checkBlock'].textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
    cardBlocks['descriptionBlock'].textContent = element.offer.description;

    renderServices(cardBlocks.featuresBlock, element.offer.features);

    return cardItem;
  };
})();
