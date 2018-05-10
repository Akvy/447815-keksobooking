'use strict';

(function () {
  var INITIAL_PIN_HEIGHT = 22;
  var KEY_ENTER = 13;
  var MapLimit = {
    HORIZONTAL_MIN: 0,
    VERTICAL_MIN: 150,
    VERTICAL_MAX: 500
  };
  var domElements = window.domElements.get();
  var initialButtonImage = domElements.initialButton.querySelector('img');
  var offsetX = initialButtonImage.offsetWidth / 2;
  var offsetY = initialButtonImage.offsetHeight + INITIAL_PIN_HEIGHT;
  var fieldsetsElements = Array.from(domElements.fieldsets);
  var resetButton = document.querySelector('.ad-form__reset');

  fieldsetsElements.forEach(function (elem) {
    elem.setAttribute('disabled', '');
  });

  function removeDisabledAttr(arr) {
    arr.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  domElements.initialButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      evt.preventDefault();

      var advertsPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (domElements.map.classList.contains('map--faded')) {
        window.backend.load(window.pins.makeAll, window.backend.errorHandler);
      }

      domElements.map.classList.remove('map--faded');
      domElements.inactiveMapform.classList.remove('ad-form--disabled');
      domElements.filtersBar.classList.remove('visually-hidden');

      removeDisabledAttr(domElements.fieldsets);

      advertsPins.forEach(function (element) {
        element.style.display = 'block';
      });

      domElements.filtersBar.style.display = 'flex';
      resetButton.addEventListener('click', window.form.resetButtonClickHandler);
      domElements.filtersBar.addEventListener('change', window.compareForm.filtersBarChangeHandler);
    }
  });

  domElements.initialButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var offsetXY = domElements.map.getBoundingClientRect();

    var initialCoordinates = {
      x: evt.clientX - offsetXY.left,
      y: evt.clientY - offsetXY.top
    };

    function initialButtonMousemoveHandler(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: initialCoordinates.x - (moveEvt.clientX - offsetXY.left),
        y: initialCoordinates.y - (moveEvt.clientY - offsetXY.top)
      };
      var pinCurrentX = moveEvt.clientX - shift.x - offsetXY.left - offsetX;
      var pinCurrentY = moveEvt.clientY - shift.y - offsetXY.top - offsetY / 2;
      var pinCoordinates = tracePinPen(pinCurrentX, pinCurrentY);

      initialCoordinates = {
        x: moveEvt.clientX - offsetXY.left,
        y: moveEvt.clientY - offsetXY.top
      };

      domElements.initialButton.style.left = pinCoordinates.x + 'px';
      domElements.initialButton.style.top = pinCoordinates.y + 'px';

      domElements.addressInput.value = pinCoordinates.x + offsetX + ', ' + (pinCoordinates.y + offsetY);
    }

    function tracePinPen(x, y) {
      var mapWidth = domElements.map.offsetWidth;
      var pinOffsetX = initialButtonImage.offsetWidth;
      var pinPositionX = x;
      var pinPositionY = y;
      var pinOffsetY = MapLimit.VERTICAL_MAX - offsetY;

      if (x < MapLimit.HORIZONTAL_MIN) {
        pinPositionX = MapLimit.HORIZONTAL_MIN;
      }

      if (x > mapWidth - pinOffsetX) {
        pinPositionX = mapWidth - pinOffsetX;
      }

      if (y < MapLimit.VERTICAL_MIN - offsetY) {
        pinPositionY = MapLimit.VERTICAL_MIN - offsetY;
      }

      if (y > pinOffsetY) {
        pinPositionY = pinOffsetY;
      }
      return {x: parseInt(pinPositionX, 10), y: parseInt(pinPositionY, 10)};
    }

    function initialButtonMouseupHandler(upEvt) {
      upEvt.preventDefault();

      if (domElements.map.classList.contains('map--faded')) {
        var initianAdverts = window.map.adverts.slice();

        window.pins.makeAll(initianAdverts);
      }

      domElements.map.classList.remove('map--faded');
      domElements.inactiveMapform.classList.remove('ad-form--disabled');
      domElements.filtersBar.classList.remove('visually-hidden');

      removeDisabledAttr(domElements.fieldsets);

      domElements.filtersBar.style.display = 'flex';

      document.removeEventListener('mousemove', initialButtonMousemoveHandler);
      document.removeEventListener('mouseup', initialButtonMouseupHandler);
      resetButton.addEventListener('click', window.form.resetButtonClickHandler);
      domElements.filtersBar.addEventListener('change', window.compareForm.filtersBarChangeHandler);
    }

    document.addEventListener('mousemove', initialButtonMousemoveHandler);
    document.addEventListener('mouseup', initialButtonMouseupHandler);
  });

  window.initialPin = {
    getCoordinates: function () {
      var mainPinAddress = domElements.addressInput.value;
      var coordinateLeft = domElements.initialButton.offsetLeft + offsetX;
      var coordinateTop = domElements.initialButton.offsetTop + offsetY;

      domElements.addressInput.value = coordinateLeft + ', ' + coordinateTop;
      return mainPinAddress;
    }
  };
})();

