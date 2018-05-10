'use strict';

(function () {
  var MAX_PINS = 5;

  window.setInactiveForm();

  window.removeAllPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    Object.keys(pins).forEach(function (elem) {
      var pin = pins[elem];
      if (!pin.classList.contains('map__pin--main')) {
        pin.parentNode.removeChild(pin);
      }
    });
  };

  window.makePins = function (array) {
    var templateNode = document.querySelector('template');
    var pins = document.querySelector('.map__pins');
    var pin = templateNode.content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    var trimmedArray = array.slice(0, MAX_PINS);

    for (var i = 0; i < trimmedArray.length; i++) {
      var card = templateNode.content.cloneNode(true);
      var button = card.querySelector('.map__pin');
      pin = window.renderPin(trimmedArray[i], i, button);
      fragment.appendChild(pin);
    }
    pins.appendChild(fragment);
  };
})();
