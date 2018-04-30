'use strict';

window.map = (function () {
  var KEY_ESC = 27;
  var dom = window.getDomElements;
  var initialButtonImg = dom.initialButton.querySelector('img');
  // var card = dom.templateNode.content.cloneNode(true);

  function closeButtonClickHandler() {
    var openedCard = document.querySelector('.map__card');

    openedCard.classList.add('visually-hidden');
  }

  function closeButtonKeydownHandler(evt) {
    if (evt.keyCode === KEY_ESC) {
      closeButtonClickHandler();
    }
  }

  return {
    getAdverts: function () {
      var PINS_COUNT = 8;
      var adverts = [];

      for (var i = 0; i < PINS_COUNT; i++) {
        adverts.push(window.data.createAdvertData(i));
      }
      return adverts;
    },
    pinClickHandler: function (num) {
      return function () {
        dom.map.insertBefore(window.card.renderCard(num, window.map.getAdverts()[num]), dom.mapFiltersContainer);

        var closeButton = document.querySelector('.popup__close');

        closeButton.addEventListener('click', closeButtonClickHandler);

        document.addEventListener('keydown', closeButtonKeydownHandler);
      };
    },
    setInactiveForm: function () {
      var advertPins = document.querySelectorAll('.map__pin');
      var INITIAL_PIN_HEIGHT = 22;
      var mainPinWidth = parseInt(dom.initialButton.style.left, 10) + initialButtonImg.offsetWidth / 2;
      var mainPinHeight = parseInt(dom.initialButton.style.top, 10) + initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;

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
