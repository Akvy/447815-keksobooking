'use strict';

(function () {
  var MAX_PINS = 5;

  window.map.setInactiveForm();

  window.pins = {
    removeAll: function () {
      var advertsPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      advertsPins.forEach(function (element, index, array) {
        array[index].remove();
      });
    },
    makeAll: function (array) {
      var templateNode = document.querySelector('template');
      var pins = document.querySelector('.map__pins');
      var pin = templateNode.content.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();
      var trimmedPins = array.slice(0, MAX_PINS);

      for (var i = 0; i < trimmedPins.length; i++) {
        var card = templateNode.content.cloneNode(true);
        var button = card.querySelector('.map__pin');
        pin = window.pin.render(trimmedPins[i], i, button);
        fragment.appendChild(pin);
      }
      pins.appendChild(fragment);
    }
  };
})();
