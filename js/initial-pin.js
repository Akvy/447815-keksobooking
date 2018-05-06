'use strict';

window.initialPin = (function () {
  var INITIAL_PIN_HEIGHT = 22;
  var KEY_ENTER = 13;
  var MapLimit = {
    HORIZONTAL_MIN: 0,
    VERTICAL_MIN: 150,
    VERTICAL_MAX: 500
  };
  var dom = window.domElements;
  var initialButtonImg = dom.initialButton.querySelector('img');
  var offsetX = initialButtonImg.offsetWidth / 2;
  var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;

  for (var i = 0; i < dom.fieldsets.length; i++) {
    dom.fieldsets[i].setAttribute('disabled', '');
  }

  var removeDisabledAttr = function (arr) {
    arr.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  dom.initialButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      evt.preventDefault();

      var initPins = document.querySelectorAll('.map__pin');

      dom.map.classList.remove('map--faded');
      dom.inactiveMapform.classList.remove('ad-form--disabled');
      dom.filtersBar.classList.remove('visually-hidden');

      removeDisabledAttr(dom.fieldsets);

      for (i = 1; i < initPins.length; i++) {
        initPins[i].style.display = 'block';
      }

      dom.filtersBar.style.display = 'flex';
    }
  });

  dom.initialButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var offsetXY = dom.map.getBoundingClientRect();

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
      var pinCurrentX = moveEvt.clientX - shift.x - offsetXY.left - offsetX;
      var pinCurrentY = moveEvt.clientY - shift.y - offsetXY.top - offsetY / 2;
      var posXY = tracePinPen(pinCurrentX, pinCurrentY);

      startCoords = {
        x: moveEvt.clientX - offsetXY.left,
        y: moveEvt.clientY - offsetXY.top
      };

      dom.initialButton.style.left = posXY.x + 'px';
      dom.initialButton.style.top = posXY.y + 'px';

      dom.addressInput.value = posXY.x + offsetX + ', ' + (posXY.y + offsetY);
    };

    function tracePinPen(x, y) {
      var mapWidth = dom.map.offsetWidth;
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

    var initialButtonMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      if (dom.map.classList.contains('map--faded')) {
        window.backend.load(window.pins.makePins, window.backend.onError);
      }

      dom.map.classList.remove('map--faded');
      dom.inactiveMapform.classList.remove('ad-form--disabled');
      dom.filtersBar.classList.remove('visually-hidden');

      removeDisabledAttr(dom.fieldsets);

      dom.filtersBar.style.display = 'flex';

      document.removeEventListener('mousemove', initialButtonMousemoveHandler);
      document.removeEventListener('mouseup', initialButtonMouseupHandler);
    };

    document.addEventListener('mousemove', initialButtonMousemoveHandler);
    document.addEventListener('mouseup', initialButtonMouseupHandler);
  });

  return {
    getInititalPinCoords: function () {
      var mainPinAddress = dom.addressInput.value;
      var coordLeft = dom.initialButton.offsetLeft + offsetX;
      var coordTop = dom.initialButton.offsetTop + offsetY;

      dom.addressInput.value = coordLeft + ', ' + coordTop;
      return mainPinAddress;
    }
  };
})();


