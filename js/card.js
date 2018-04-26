'use strict';

window.card = (function () {
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

  function pinClickHandler(num) {
  return function () {
    // if (document.querySelector('.map__card')) {
    //   map.removeChild('.map__card');
    // }

    map.insertBefore(window.card.renderCard(num), document.querySelector('.map__filters-container'));

    var closeButton = document.querySelector('.popup__close');

    closeButton.addEventListener('click', closeButtonClickHandler);

    document.addEventListener('keydown', closeButtonKeydownHandler);
  };
}
pin.addEventListener('click', pinClickHandler(num));

  return {

  };
})();
