'use strict';

(function () {
  var KEY_ESC = 27;
  var INITIAL_PIN_HEIGHT = 22;
  var adverts = [];
  var domElements = window.domElements.get();
  var initialButtonImage = domElements.initialButton.querySelector('img');

  function getAdverts(array) {
    array.forEach(function (elem) {
      adverts.push(elem);
    });
  }

  window.backend.load(getAdverts, window.backend.errorHandler);

  window.map = {
    closeButtonClickHandler: function () {
      var openedCard = document.querySelector('.map__card');
      var closeButton = document.querySelector('.popup__close');

      openedCard.classList.add('visually-hidden');
      closeButton.removeEventListener('click', window.map.closeButtonClickHandler);
      document.removeEventListener('keydown', window.map.closeButtonKeydownHandler);
    },
    closeButtonKeydownHandler: function (evt) {
      if (evt.keyCode === KEY_ESC) {
        window.map.closeButtonClickHandler();
      }
    },
    adverts: adverts,
    pinClickHandler: function (num, element) {
      return function () {
        var pinRender = window.card.render(element);

        domElements.map.insertBefore(pinRender, domElements.mapFiltersContainer);

        var closeButton = document.querySelector('.popup__close');

        closeButton.addEventListener('click', window.map.closeButtonClickHandler);

        document.addEventListener('keydown', window.map.closeButtonKeydownHandler);
      };
    },
    setInactiveForm: function () {
      var advertsPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var initialLeftCoordinate = domElements.initialButton.offsetLeft;
      var initialTopCoordinate = domElements.initialButton.offsetTop;
      var halfPinWidth = Math.round(initialButtonImage.offsetWidth / 2);
      var pinFullHeight = initialButtonImage.offsetHeight + INITIAL_PIN_HEIGHT;
      var mainPinWidth = initialLeftCoordinate + halfPinWidth;
      var mainPinHeight = initialTopCoordinate + pinFullHeight;

      advertsPins.forEach(function (element) {
        element.style.display = 'none';
      });

      domElements.filtersBar.style.display = 'none';
      domElements.priceInput.setAttribute('min', '1000');
      domElements.priceInput.placeholder = '1 000';
      domElements.addressInput.value = mainPinWidth + ', ' + mainPinHeight;

      window.map.disableCapacityOptions();

      domElements.capacitySelect.selectedIndex = 2;
      domElements.capacitySelect.children[2].removeAttribute('disabled');
    },
    disableCapacityOptions: function () {
      var capacityOptions = Array.from(domElements.capacitySelect.children);

      capacityOptions.forEach(function (elem) {
        elem.setAttribute('disabled', '');
      });
    }
  };
})();
