'use strict';

window.initialPin = (function () {
  var HORIZONTAL_MIN = 0;
  var VERTICAL_MIN = 150;
  var VERTICAL_MAX = 500;
  var INITIAL_PIN_HEIGHT = 22;
  var KEY_ENTER = 13;
  var initialButton = document.querySelector('.map__pin--main');
  var initialButtonImg = initialButton.querySelector('img');
  var mainPinWidth = +initialButton.style.left.slice(0, -2) + initialButtonImg.offsetWidth / 2;
  var mainPinHeight = +initialButton.style.top.slice(0, -2) + initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
  var inactiveMap = document.querySelector('.map');
  var inactiveMapform = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', '');
  }

  var removeDisabledAttr = function (arr) {
    for (i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled', '');
    }
  };

  function initialButtonMouseupHandler() {
    var initPins = document.querySelectorAll('.map__pin');

    inactiveMap.classList.remove('map--faded');
    inactiveMapform.classList.remove('ad-form--disabled');
    window.map.filtersBar.classList.remove('visually-hidden');

    removeDisabledAttr(fieldsets);

    for (i = 1; i < initPins.length; i++) {
      initPins[i].style.display = 'block';
    }

    window.map.filtersBar.style.display = 'flex';
  }

  function initialButtonKeydownHandler(evt) {
    if (evt.keyCode === KEY_ENTER) {
      initialButtonMouseupHandler();
    }
  }

  initialButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var offsetXY = window.map.map.getBoundingClientRect();

    var startCoords = {
      x: evt.clientX - offsetXY.left,
      y: evt.clientY - offsetXY.top
    };

    var initialButtonMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - (moveEvt.clientX - offsetXY.left),
        y: startCoords.y - (moveEvt.clientY - offsetXY.top)
      };
      var offsetX = initialButtonImg.offsetWidth / 2;
      var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
      var pinCurrentX = moveEvt.clientX - shift.x - offsetXY.left - offsetX;
      var pinCurrentY = moveEvt.clientY - shift.y - offsetXY.top - offsetY / 2;
      var posXY = tracePinPen(pinCurrentX, pinCurrentY);

      startCoords = {
        x: moveEvt.clientX - offsetXY.left,
        y: moveEvt.clientY - offsetXY.top
      };

      initialButton.style.left = posXY.x + 'px';
      initialButton.style.top = posXY.y + 'px';

      window.map.addressInput.value = posXY.x + offsetX + ', ' + (posXY.y + offsetY);
    };

    function tracePinPen(x, y) {
      var mapWidth = window.map.map.offsetWidth;
      var pinOffsetX = initialButtonImg.offsetWidth;
      var posX = x;
      var posY = y;
      var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
      var pinOffsetY = VERTICAL_MAX - offsetY;

      if (x < HORIZONTAL_MIN) {
        posX = HORIZONTAL_MIN;
      }

      if (x > mapWidth - pinOffsetX) {
        posX = mapWidth - pinOffsetX;
      }

      if (y < VERTICAL_MIN - offsetY) {
        posY = VERTICAL_MIN - offsetY;
      }

      if (y > pinOffsetY) {
        posY = pinOffsetY;
      }
      return {x: parseInt(posX, 10), y: parseInt(posY, 10)};
    }

    var initialButtonMouseupMoveHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', initialButtonMousemoveHandler);
      document.removeEventListener('mouseup', initialButtonMouseupMoveHandler);
    };

    document.addEventListener('mousemove', initialButtonMousemoveHandler);
    document.addEventListener('mouseup', initialButtonMouseupMoveHandler);
  });

  initialButton.addEventListener('mouseup', initialButtonMouseupHandler);
  initialButton.addEventListener('keydown', initialButtonKeydownHandler);

  return {
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight
  };
})();


