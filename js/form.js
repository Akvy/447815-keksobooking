'use strict';

window.form = (function () {
  var addressInput = document.getElementById('address');
  var roomsSelect = document.getElementById('room_number');
  var typeSelect = document.getElementById('type');
  var priceInput = document.getElementById('price');
  var capacitySelect = document.getElementById('capacity');

  var setMinPrice = function (num, minPrice, placeHolder) {
    if (typeSelect.selectedIndex === num) {
      priceInput.setAttribute('min', minPrice);
      priceInput.placeholder = placeHolder;
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
      capacitySelect.children[i].removeAttribute('disabled', '');

      capacitySelect.selectedIndex = to;
    }
  };

  function disableCapacityOptions() {
    for (var i = 0; i < capacitySelect.children.length; i++) {
      capacitySelect.children[i].setAttribute('disabled', '');
    }
  }

  roomsSelect.addEventListener('change', function (evt) {
  var target = evt.target;

  disableCapacityOptions();

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

  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');

  adForm.addEventListener('submit', function () {
  successWindow.classList.remove('hidden');
  });

  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');

  adForm.addEventListener('submit', function () {
    successWindow.classList.remove('hidden');
  });

  return {
    addressInput,
    priceInput,
    capacitySelect,
    disableCapacityOptions: disableCapacityOptions
  };
})();

