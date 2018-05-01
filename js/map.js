'use strict';

window.map = (function () {
  var KEY_ESC = 27;
  var PINS_COUNT = 8;
  var INITIAL_PIN_HEIGHT = 22;
  var dom = window.getdomelements;
  var initialButtonImg = dom.initialButton.querySelector('img');

  function closeButtonClickHandler() {
    var openedCard = document.querySelector('.map__card');

    openedCard.classList.add('visually-hidden');
  }

  function closeButtonKeydownHandler(evt) {
    if (evt.keyCode === KEY_ESC) {
      closeButtonClickHandler();
    }
  }

  function getAdverts() {
    var adverts = [];

    for (var i = 0; i < PINS_COUNT; i++) {
      adverts.push(window.data.createAdvertData(i));
    }
    return adverts;
  }

  return {
    advertsDone: getAdverts(),
    pinClickHandler: function (num) {
      return function () {
        dom.map.insertBefore(window.card.renderCard(num, window.map.advertsDone[num]), dom.mapFiltersContainer);

        var closeButton = document.querySelector('.popup__close');

        closeButton.addEventListener('click', closeButtonClickHandler);

        document.addEventListener('keydown', closeButtonKeydownHandler);
      };
    },
    setInactiveForm: function () {
      var advertPins = document.querySelectorAll('.map__pin');
      var initLeftCoord = parseInt(dom.initialButton.style.left, 10);
      var initTopCoord = parseInt(dom.initialButton.style.top, 10);
      var halfPinWidth = parseInt(initialButtonImg.offsetWidth / 2, 10);
      var pinFullHeight = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
      var mainPinWidth = initLeftCoord + halfPinWidth;
      var mainPinHeight = initTopCoord + pinFullHeight;

      for (var i = 1; i < advertPins.length; i++) {
        advertPins[i].style.display = 'none';
      }

      dom.filtersBar.style.display = 'none';
      dom.priceInput.setAttribute('min', '1000');
      dom.priceInput.placeholder = '1 000';
      dom.addressInput.value = mainPinWidth + ', ' + mainPinHeight;

      window.map.disableCapacityOptions();

      dom.capacitySelect.selectedIndex = 2;
      dom.capacitySelect.children[2].removeAttribute('disabled', '');
    },
    disableCapacityOptions: function () {
      for (var i = 0; i < dom.capacitySelect.children.length; i++) {
        dom.capacitySelect.children[i].setAttribute('disabled', '');
      }
    }
  };
})();
