'use strict';

window.card = (function () {
  var HOUSE_TYPE = {
    'palace': 'Дворец',
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом'
  };

  function renderServices(services, possibleServices) {
    var elements = services.querySelectorAll('li');

    for (var i = 0; i < elements.length; i++) {
      if (!possibleServices[i]) {
        elements[i].remove();
      }
    }
    return services;
  }

  function removeAdverts() {
    var maps = window.map.map.querySelectorAll('.map__card');

    for (var i = 0; i < maps.length; i++) {
      maps[i].remove();
    }

    // return map;
  }

  return {
    renderCard: function (num) {
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
      var imgItem = cardBlocks.photosBlock.querySelector('img');
      var photos = window.map.returnMapData().adverts[num].offer.photos;

      removeAdverts();
      cardBlocks.photosBlock.removeChild(imgItem);

      for (var i = 0; i < photos.length; i++) {
        var imgClone = imgItem.cloneNode(true);
        imgClone.src = photos[i];
        cardBlocks.photosBlock.appendChild(imgClone);
      }

      cardBlocks.avatarBlock.src = window.map.returnMapData().adverts[num].author.avatar;
      cardBlocks['titleBlock'].textContent = window.map.returnMapData().adverts[num].offer.title;
      cardBlocks['addressBlock'].textContent = window.map.returnMapData().adverts[num].offer.address;
      cardBlocks['priceBlock'].textContent = window.map.returnMapData().adverts[num].offer.price + '₽/ночь';
      cardBlocks['typeBlock'].textContent = HOUSE_TYPE[window.map.returnMapData().adverts[num].offer.type];
      cardBlocks['capacityBlock'].textContent = window.map.returnMapData().adverts[num].offer.rooms + ' комнаты для ' + window.map.returnMapData().adverts[num].offer.guests + ' гостей';
      cardBlocks['checkBlock'].textContent = 'Заезд после ' + window.map.returnMapData().adverts[num].offer.checkin + ', выезд до ' + window.map.returnMapData().adverts[num].offer.checkout;
      cardBlocks['descriptionBlock'].textContent = window.map.returnMapData().adverts[num].offer.description;

      renderServices(cardBlocks.featuresBlock, window.map.returnMapData().adverts[num].offer.features);

      return cardItem;
    }
  };
})();
