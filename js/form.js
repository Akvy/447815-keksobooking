'use strict';

window.form = (function () {
  var SHOW_TIME = 1500;
  var dom = window.domElements;
  var typeSelect = document.getElementById('type');
  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');
  var roomsSelect = document.getElementById('room_number');
  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');

  function showSuccess() {
    successWindow.classList.remove('hidden');

    setTimeout(function () {
      successWindow.classList.add('hidden');
      adForm.reset();
      window.initialPin.getInititalPinCoords();
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
      dom.capacitySelect.children[i].removeAttribute('disabled', '');
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
})();


