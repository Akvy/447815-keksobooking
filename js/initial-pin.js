'use strict';

(function () {
  var INITIAL_PIN_HEIGHT = 22;
  var KEY_ENTER = 13;
  var MapLimit = {
    HORIZONTAL_MIN: 0,
    VERTICAL_MIN: 150,
    VERTICAL_MAX: 500
  };
  var domElements = window.getDomElements();
  var initialButtonImg = domElements.initialButton.querySelector('img');
  var offsetX = initialButtonImg.offsetWidth / 2;
  var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;

  for (var i = 0; i < domElements.fieldsets.length; i++) {
    domElements.fieldsets[i].setAttribute('disabled', '');
  }

  function removeDisabledAttr(arr) {
    arr.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  domElements.initialButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      evt.preventDefault();

      var initPins = document.querySelectorAll('.map__pin');

      if (domElements.map.classList.contains('map--faded')) {
        window.load(window.makePins, window.onError);
      }

      domElements.map.classList.remove('map--faded');
      domElements.inactiveMapform.classList.remove('ad-form--disabled');
      domElements.filtersBar.classList.remove('visually-hidden');

      removeDisabledAttr(domElements.fieldsets);

      for (i = 1; i < initPins.length; i++) {
        initPins[i].style.display = 'block';
      }

      domElements.filtersBar.style.display = 'flex';
    }
  });

  domElements.initialButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var offsetXY = domElements.map.getBoundingClientRect();

    var startCoords = {
      x: evt.clientX - offsetXY.left,
      y: evt.clientY - offsetXY.top
    };

    function initialButtonMousemoveHandler(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - (moveEvt.clientX - offsetXY.left),
        y: startCoords.y - (moveEvt.clientY - offsetXY.top)
      };
      var pinCurrentX = moveEvt.clientX - shift.x - offsetXY.left - offsetX;
      var pinCurrentY = moveEvt.clientY - shift.y - offsetXY.top - offsetY / 2;
      var posXY = tracePinPen(pinCurrentX, pinCurrentY);

      startCoords = {
        x: moveEvt.clientX - offsetXY.left,
        y: moveEvt.clientY - offsetXY.top
      };

      domElements.initialButton.style.left = posXY.x + 'px';
      domElements.initialButton.style.top = posXY.y + 'px';

      domElements.addressInput.value = posXY.x + offsetX + ', ' + (posXY.y + offsetY);
    }

    function tracePinPen(x, y) {
      var mapWidth = domElements.map.offsetWidth;
      var pinOffsetX = initialButtonImg.offsetWidth;
      var posX = x;
      var posY = y;
      var pinOffsetY = MapLimit.VERTICAL_MAX - offsetY;

      if (x < MapLimit.HORIZONTAL_MIN) {
        posX = MapLimit.HORIZONTAL_MIN;
      }

      if (x > mapWidth - pinOffsetX) {
        posX = mapWidth - pinOffsetX;
      }

      if (y < MapLimit.VERTICAL_MIN - offsetY) {
        posY = MapLimit.VERTICAL_MIN - offsetY;
      }

      if (y > pinOffsetY) {
        posY = pinOffsetY;
      }
      return {x: parseInt(posX, 10), y: parseInt(posY, 10)};
    }

    function initialButtonMouseupHandler(upEvt) {
      upEvt.preventDefault();

      if (domElements.map.classList.contains('map--faded')) {
        window.load(window.makePins, window.onError);
      }

      domElements.map.classList.remove('map--faded');
      domElements.inactiveMapform.classList.remove('ad-form--disabled');
      domElements.filtersBar.classList.remove('visually-hidden');

      removeDisabledAttr(domElements.fieldsets);

      domElements.filtersBar.style.display = 'flex';

      document.removeEventListener('mousemove', initialButtonMousemoveHandler);
      document.removeEventListener('mouseup', initialButtonMouseupHandler);
    }

    document.addEventListener('mousemove', initialButtonMousemoveHandler);
    document.addEventListener('mouseup', initialButtonMouseupHandler);
  });

  window.getInititalPinCoords = function () {
    var mainPinAddress = domElements.addressInput.value;
    var coordLeft = domElements.initialButton.offsetLeft + offsetX;
    var coordTop = domElements.initialButton.offsetTop + offsetY;

    domElements.addressInput.value = coordLeft + ', ' + coordTop;
    return mainPinAddress;
  };
})();

