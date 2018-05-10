'use strict';

(function () {
  var KEY_ESC = 27;
  var INITIAL_PIN_HEIGHT = 22;
  var adverts = [];
  var domElements = window.domElements.getDomElements();
  var initialButtonImage = domElements.initialButton.querySelector('img');

  window.closeButtonClickHandler = function () {
    var openedCard = document.querySelector('.map__card');
    var closeButton = document.querySelector('.popup__close');

    openedCard.classList.add('visually-hidden');
    closeButton.removeEventListener('click', window.closeButtonClickHandler);
    document.removeEventListener('keydown', window.closeButtonKeydownHandler);
  };

  window.closeButtonKeydownHandler = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      window.closeButtonClickHandler();
    }
  };

  window.getAdverts = function (array) {
    array.forEach(function (elem) {
      adverts.push(elem);
    });
  };

  window.backend.load(window.getAdverts, window.backend.errorHandler);

  window.adverts = adverts;

  window.pinClickHandler = function (num, element) {
    return function () {
      var pinRender = window.renderCard(element);

      domElements.map.insertBefore(pinRender, domElements.mapFiltersContainer);

      var closeButton = document.querySelector('.popup__close');

      closeButton.addEventListener('click', window.closeButtonClickHandler);

      document.addEventListener('keydown', window.closeButtonKeydownHandler);
    };
  };

  window.setInactiveForm = function () {
    var advertPins = document.querySelectorAll('.map__pin');
    var initialLeftCoordinate = domElements.initialButton.offsetLeft;
    var initialTopCoordinate = domElements.initialButton.offsetTop;
    var halfPinWidth = Math.round(initialButtonImage.offsetWidth / 2);
    var pinFullHeight = initialButtonImage.offsetHeight + INITIAL_PIN_HEIGHT;
    var mainPinWidth = initialLeftCoordinate + halfPinWidth;
    var mainPinHeight = initialTopCoordinate + pinFullHeight;

    for (var i = 1; i < advertPins.length; i++) {
      advertPins[i].style.display = 'none';
    }

    domElements.filtersBar.style.display = 'none';
    domElements.priceInput.setAttribute('min', '1000');
    domElements.priceInput.placeholder = '1 000';
    domElements.addressInput.value = mainPinWidth + ', ' + mainPinHeight;

    window.disableCapacityOptions();

    domElements.capacitySelect.selectedIndex = 2;
    domElements.capacitySelect.children[2].removeAttribute('disabled');
  };

  window.disableCapacityOptions = function () {
    var capacityOptions = Array.from(domElements.capacitySelect.children);

    capacityOptions.forEach(function (elem) {
      elem.setAttribute('disabled', '');
    });
  };
})();
