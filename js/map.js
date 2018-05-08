'use strict';

window.map = (function () {
  var KEY_ESC = 27;
  var INITIAL_PIN_HEIGHT = 22;
  var adverts = [];
  var domElements = window.domElements();
  var initialButtonImg = domElements.initialButton.querySelector('img');

  function closeButtonClickHandler() {
    var openedCard = document.querySelector('.map__card');

    openedCard.classList.add('visually-hidden');
  }

  function closeButtonKeydownHandler(evt) {
    if (evt.keyCode === KEY_ESC) {
      closeButtonClickHandler();
    }
  }

  function getAdverts(array) {
    for (var i = 0; i < array.length; i++) {
      adverts.push(array[i]);
    }
  }

  window.load(getAdverts, window.onError);

  return {
    adverts: adverts,
    pinClickHandler: function (num, element) {
      return function () {
        var pinRender = window.card.renderCard(element);

        domElements.map.insertBefore(pinRender, domElements.mapFiltersContainer);

        var closeButton = document.querySelector('.popup__close');

        closeButton.addEventListener('click', closeButtonClickHandler);

        document.addEventListener('keydown', closeButtonKeydownHandler);
      };
    },
    setInactiveForm: function () {
      var advertPins = document.querySelectorAll('.map__pin');
      var initLeftCoord = domElements.initialButton.offsetLeft;
      var initTopCoord = domElements.initialButton.offsetTop;
      var halfPinWidth = Math.round(initialButtonImg.offsetWidth / 2);
      var pinFullHeight = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
      var mainPinWidth = initLeftCoord + halfPinWidth;
      var mainPinHeight = initTopCoord + pinFullHeight;

      for (var i = 1; i < advertPins.length; i++) {
        advertPins[i].style.display = 'none';
      }

      domElements.filtersBar.style.display = 'none';
      domElements.priceInput.setAttribute('min', '1000');
      domElements.priceInput.placeholder = '1 000';
      domElements.addressInput.value = mainPinWidth + ', ' + mainPinHeight;

      window.map.disableCapacityOptions();

      domElements.capacitySelect.selectedIndex = 2;
      domElements.capacitySelect.children[2].removeAttribute('disabled');
    },
    disableCapacityOptions: function () {
      for (var i = 0; i < domElements.capacitySelect.children.length; i++) {
        domElements.capacitySelect.children[i].setAttribute('disabled', '');
      }
    }
  };
})();
