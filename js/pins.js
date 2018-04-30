'use strict';

window.pins = (function () {
  function makePins() {
    var templateNode = document.querySelector('template');
    var pins = document.querySelector('.map__pins');
    var pin = templateNode.content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    // console.log(window.map.getAdverts());

    for (var i = 0; i < window.map.getAdverts().length; i++) {
      var card = templateNode.content.cloneNode(true);
      var button = card.querySelector('.map__pin');
      pin = window.pin.renderPin(window.map.getAdverts()[i], i, button);

      fragment.appendChild(pin);
    }
    pins.appendChild(fragment);
  }

  makePins();

  window.map.setInactiveForm();

  return {
    makePins: makePins,
  };
})();
