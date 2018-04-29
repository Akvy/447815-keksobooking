'use strict';

window.pin = (function () {
  function makePins() {
    var templateNode = document.querySelector('template');
    var pins = document.querySelector('.map__pins');
    var pin = templateNode.content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.map.returnMapData().adverts.length; i++) {
      var card = templateNode.content.cloneNode(true);
      var button = card.querySelector('.map__pin');
      pin = window.pin.renderPin(i, button);

      fragment.appendChild(pin);
    }
    pins.appendChild(fragment);
  }

  makePins();
  window.map.setInactiveForm();

  return {
    makePins: makePins
  };
})();

