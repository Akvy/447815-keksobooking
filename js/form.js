'use strict';

(function () {
  var SHOW_TIME = 1500;
  var PIN_INITIAL_LEFT_COORD = 570;
  var PIN_INITIAL_TOP_COORD = 375;
  // var INITIAL_PIN_HEIGHT = 22;
  var domElements = window.getDomElements();
  var typeSelect = document.getElementById('type');
  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');
  var roomsSelect = document.getElementById('room_number');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var successWindow = document.querySelector('.success');
  var resetButton = document.querySelector('.ad-form__reset');
  // var initialButtonImg = domElements.initialButton.querySelector('img');


  function showSuccess() {
    var mapCard = document.querySelector('.map__card');
    var closeButton = document.querySelector('.popup__close');

    successWindow.classList.remove('hidden');

    setTimeout(function () {
      successWindow.classList.add('hidden');
      domElements.map.classList.add('map--faded');
      window.disableCapacityOptions();
      domElements.inactiveMapform.classList.add('ad-form--disabled');
      domElements.filtersBar.classList.add('visually-hidden');
      adForm.reset();
      filtersForm.reset();
      domElements.initialButton.style.left = PIN_INITIAL_LEFT_COORD + 'px';
      domElements.initialButton.style.top = PIN_INITIAL_TOP_COORD + 'px';
      window.getInititalPinCoords();
      window.setInactiveForm();

      if (mapCard) {
        mapCard.remove();
      }

      closeButton.removeEventListener('click', window.closeButtonClickHandler);
      document.removeEventListener('keydown', window.closeButtonKeydownHandler);

      for (var i = 0; i < adForm.children.length; i++) {
        adForm.children[i].setAttribute('disabled', '');
      }
    }, SHOW_TIME);
  }

  function setMinPrice(num, minPrice, placeHolder) {
    if (typeSelect.selectedIndex === num) {
      domElements.priceInput.setAttribute('min', minPrice);
      domElements.priceInput.placeholder = placeHolder;
    }
  }

  typeSelect.addEventListener('change', function () {
    setMinPrice(0, '1000', '1 000');
    setMinPrice(1, '0', '0');
    setMinPrice(2, '5000', '5 000');
    setMinPrice(3, '10000', '10 000');
  });

  function addCapacityOption(from, to) {
    for (var i = from; i <= to; i++) {
      domElements.capacitySelect.children[i].removeAttribute('disabled');
    }

    domElements.capacitySelect.selectedIndex = to;
  }

  roomsSelect.addEventListener('change', function (evt) {
    var target = evt.target;

    window.disableCapacityOptions();

    if (!target.selectedIndex) {
      addCapacityOption(2, 2);
    }

    if (target.selectedIndex === 1) {
      addCapacityOption(1, 2);
    }

    if (target.selectedIndex === 2) {
      addCapacityOption(0, 2);
    }

    if (target.selectedIndex === 3) {
      addCapacityOption(3, 3);
    }
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), showSuccess, window.onError);
  });

  resetButton.addEventListener('click', function (evt) {
    var mapCard = document.querySelector('.map__card');
    var closeButton = document.querySelector('.popup__close');

    evt.preventDefault();

    domElements.map.classList.add('map--faded');
    window.disableCapacityOptions();
    domElements.inactiveMapform.classList.add('ad-form--disabled');
    domElements.filtersBar.classList.add('visually-hidden');
    adForm.reset();
    filtersForm.reset();
    domElements.initialButton.style.left = PIN_INITIAL_LEFT_COORD + 'px';
    domElements.initialButton.style.top = PIN_INITIAL_TOP_COORD + 'px';
    window.getInititalPinCoords();
    window.setInactiveForm();

    if (mapCard) {
      mapCard.remove();
    }

    closeButton.removeEventListener('click', window.closeButtonClickHandler);
    document.removeEventListener('keydown', window.closeButtonKeydownHandler);

    for (var i = 0; i < adForm.children.length; i++) {
      adForm.children[i].setAttribute('disabled', '');
    }
  });
})();
