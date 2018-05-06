'use strict';

window.pins = (function () {
  var MAX_PINS = 5;

  window.map.setInactiveForm();

  return {
    removeAllPins: function () {
      var pins = document.querySelectorAll('.map__pin');
      Object.keys(pins).forEach(function (elem) {
        var pin = pins[elem];
        if (!pin.classList.contains('map__pin--main')) {
          pin.parentNode.removeChild(pin);
        }
      });
    },
    makePins: function (array) {
      var templateNode = document.querySelector('template');
      var pins = document.querySelector('.map__pins');
      var pin = templateNode.content.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();

      if (array.length - 1 > MAX_PINS) {
        array.length = MAX_PINS;
      }

      for (var i = 0; i < array.length; i++) {
        var card = templateNode.content.cloneNode(true);
        var button = card.querySelector('.map__pin');
        pin = window.pin.renderPin(array[i], i, button);
        fragment.appendChild(pin);
      }
      pins.appendChild(fragment);
    }
  };
})();
