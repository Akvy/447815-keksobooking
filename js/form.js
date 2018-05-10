'use strict';

(function () {
  var SHOW_TIME = 1500;
  var PIN_INITIAL_LEFT_COORDINATE = 570;
  var PIN_INITIAL_TOP_COORDINATE = 375;
  var domElements = window.domElements.get();
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var successWindow = document.querySelector('.success');
  var resetButton = document.querySelector('.ad-form__reset');

  function resetPage() {
    var mapCard = document.querySelector('.map__card');
    var closeButton = document.querySelector('.popup__close');
    var adFormItems = Array.from(adForm.children);

    domElements.map.classList.add('map--faded');
    window.map.disableCapacityOptions();
    domElements.inactiveMapform.classList.add('ad-form--disabled');
    domElements.filtersBar.classList.add('visually-hidden');
    adForm.reset();
    filtersForm.reset();
    domElements.initialButton.style.left = PIN_INITIAL_LEFT_COORDINATE + 'px';
    domElements.initialButton.style.top = PIN_INITIAL_TOP_COORDINATE + 'px';
    window.initialPin.getCoordinates();
    window.map.setInactiveForm();
    window.pins.removeAll();
    resetButton.removeEventListener('click', window.form.resetButtonClickHandler);
    domElements.filtersBar.removeEventListener('change', window.compareForm.filtersBarChangeHandler);

    if (mapCard) {
      closeButton.removeEventListener('click', window.map.closeButtonClickHandler);
      document.removeEventListener('keydown', window.map.closeButtonKeydownHandler);
      mapCard.remove();
    }

    adFormItems.forEach(function (elem) {
      elem.setAttribute('disabled', '');
    });
  }

  function showSuccess() {
    successWindow.classList.remove('hidden');

    setTimeout(function () {
      successWindow.classList.add('hidden');

      resetPage();
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
    window.backend.upload(new FormData(adForm), showSuccess, window.backend.errorHandler);
  });

  window.form = {
    resetButtonClickHandler: function (evt) {
      evt.preventDefault();

      resetPage();
    }
  };
})();
