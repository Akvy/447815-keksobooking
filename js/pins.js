'use strict';

(function () {
  var MAX_PINS = 5;

  window.map.setInactiveForm();

  window.pins = {
    removeAll: function () {
      var pins = document.querySelectorAll('.map__pin');

      for (var i = 1; i < pins.length; i++) {
        pins[i].parentNode.removeChild(pins[i]);
      }
    },
    makeAll: function (array) {
      var templateNode = document.querySelector('template');
      var pins = document.querySelector('.map__pins');
      var pin = templateNode.content.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();
      var trimmedArray = array.slice(0, MAX_PINS);

      for (var i = 0; i < trimmedArray.length; i++) {
        var card = templateNode.content.cloneNode(true);
        var button = card.querySelector('.map__pin');
        pin = window.pin.render(trimmedArray[i], i, button);
        fragment.appendChild(pin);
      }
      pins.appendChild(fragment);
    }
  };
})();
