'use strict';

window.form = (function () {
  var SHOW_TIME = 1500;
  var PIN_INITIAL_LEFT_COORD = 570;
  var PIN_INITIAL_TOP_COORD = 375;
  var INITIAL_PIN_HEIGHT = 22;
  var dom = window.domElements;
  var typeSelect = document.getElementById('type');
  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');
  var roomsSelect = document.getElementById('room_number');
  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');
  var resetButton = document.querySelector('.ad-form__reset');
  var initialButtonImg = dom.initialButton.querySelector('img');

  function showSuccess() {
    var mapCard = document.querySelector('.map__card');

    successWindow.classList.remove('hidden');

    setTimeout(function () {
      successWindow.classList.add('hidden');
      dom.map.classList.add('map--faded');
      window.map.disableCapacityOptions();
      dom.inactiveMapform.classList.add('ad-form--disabled');
      dom.filtersBar.classList.add('visually-hidden');
      adForm.reset();
      dom.initialButton.style.left = PIN_INITIAL_LEFT_COORD + 'px';
      dom.initialButton.style.top = PIN_INITIAL_TOP_COORD + 'px';
      window.initialPin.getInititalPinCoords();
      window.map.setInactiveForm();

      if (mapCard) {
        mapCard.remove();
      }

      for (var i = 0; i < adForm.children.length; i++) {
        adForm.children[i].setAttribute('disabled', '');
      }
    }, SHOW_TIME);
  }

  var setMinPrice = function (num, minPrice, placeHolder) {
    if (typeSelect.selectedIndex === num) {
      dom.priceInput.setAttribute('min', minPrice);
      dom.priceInput.placeholder = placeHolder;
    }
  };

  typeSelect.addEventListener('change', function () {
    setMinPrice(0, '1000', '1 000');
    setMinPrice(1, '0', '0');
    setMinPrice(2, '5000', '5 000');
    setMinPrice(3, '10000', '10 000');
  });

  var addCapacityOption = function (from, to) {
    for (var i = from; i <= to; i++) {
      dom.capacitySelect.children[i].removeAttribute('disabled');
    }

    dom.capacitySelect.selectedIndex = to;
  };

  roomsSelect.addEventListener('change', function (evt) {
    var target = evt.target;

    window.map.disableCapacityOptions();

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
    window.backend.upload(new FormData(adForm), showSuccess, window.backend.onError);
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    var advertPins = document.querySelectorAll('.map__pin');
    var initLeftCoord = dom.initialButton.offsetLeft;
    var initTopCoord = dom.initialButton.offsetTop;
    var halfPinWidth = Math.round(initialButtonImg.offsetWidth / 2);
    var pinFullHeight = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
    var mainPinWidth = initLeftCoord + halfPinWidth;
    var mainPinHeight = initTopCoord + pinFullHeight;

    adForm.reset();
    dom.addressInput.value = mainPinWidth + ', ' + mainPinHeight;
  });
})();


