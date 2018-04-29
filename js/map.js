'use strict';

window.map = (function () {
  var templateNode = document.querySelector('template');
  var card = templateNode.content.cloneNode(true);
  var map = document.querySelector('.map');
  var KEY_ESC = 27;
  var filtersBar = document.querySelector('.map__filters');
  var addressInput = document.getElementById('address');
  var adverts = [];

  var getAdverts = function (array, amount) {
    for (var i = 0; i < amount; i++) {
      array.push(window.data.createAdvertData(i));
    }
  };

  function pinClickHandler(num) {
    return function () {
      map.insertBefore(window.card.renderCard(num), document.querySelector('.map__filters-container'));

      var closeButton = document.querySelector('.popup__close');

      closeButton.addEventListener('click', closeButtonClickHandler);

      document.addEventListener('keydown', closeButtonKeydownHandler);
    };
  }

  getAdverts(adverts, window.data.createAdvertData().titlesAmount);

  var priceInput = document.getElementById('price');
  var capacitySelect = document.getElementById('capacity');

  var setInactiveForm = function () {
    var advertPins = document.querySelectorAll('.map__pin');

    for (var i = 1; i < advertPins.length; i++) {
      advertPins[i].style.display = 'none';

    }

    filtersBar.style.display = 'none';
    priceInput.setAttribute('min', '1000');
    priceInput.placeholder = '1 000';
    addressInput.value = window.InitialPin.mainPinWidth + ', ' + window.InitialPin.mainPinHeight;

    disableCapacityOptions();

    capacitySelect.selectedIndex = 2;
    capacitySelect.children[2].removeAttribute('disabled', '');
  };

  function closeButtonClickHandler() {
    var openedCard = document.querySelector('.map__card');

    openedCard.classList.add('visually-hidden');
  }

  function closeButtonKeydownHandler(evt) {
    if (evt.keyCode === KEY_ESC) {
      closeButtonClickHandler();
    }
  }

  function disableCapacityOptions() {
    for (var i = 0; i < capacitySelect.children.length; i++) {
      capacitySelect.children[i].setAttribute('disabled', '');
    }
  }

  return {
    returnMapData: function () {
      return {
        adverts: adverts
      };
    },
    // adverts: adverts,
    templateNode: templateNode,
    card: card,
    map: map,
    pinClickHandler: pinClickHandler,
    setInactiveForm: setInactiveForm,
    priceInput: priceInput,
    capacitySelect: capacitySelect,
    disableCapacityOptions: disableCapacityOptions,
    filtersBar: filtersBar,
    addressInput: addressInput
  };
})();
