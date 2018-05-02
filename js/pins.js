'use strict';

window.pins = (function () {
  // function makePins() {
  //   var templateNode = document.querySelector('template');
  //   var pins = document.querySelector('.map__pins');
  //   var pin = templateNode.content.querySelector('.map__pin');
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < window.map.advertsDone.length; i++) {
  //     var card = templateNode.content.cloneNode(true);
  //     var button = card.querySelector('.map__pin');
  //     pin = window.pin.renderPin(window.map.advertsDone[i], i, button);

  //     fragment.appendChild(pin);
  //   }
  //   pins.appendChild(fragment);
  // }

  //   function makePins(array) {
  //   var templateNode = document.querySelector('template');
  //   var pins = document.querySelector('.map__pins');
  //   var pin = templateNode.content.querySelector('.map__pin');
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < array.length; i++) {
  //     var card = templateNode.content.cloneNode(true);
  //     var button = card.querySelector('.map__pin');
  //     pin = window.pin.renderPin(array[i], i, button);

  //     fragment.appendChild(pin);
  //   }
  //   pins.appendChild(fragment);
  // }

  // makePins();

  // window.load(makePins, onError);

  window.map.setInactiveForm();

  return {
    removeAllPins: function () {
      var pins = document.querySelectorAll('.map__pin');
      Object.keys(pins).forEach(function (elem) {
        var pin = pins[elem];
        if (!pin.classList.contains('map__pin--main')) {
          pins[elem].parentNode.removeChild(pins[elem]);
        }
      });
    },
    makePins: function (array) {
      var templateNode = document.querySelector('template');
      var pins = document.querySelector('.map__pins');
      var pin = templateNode.content.querySelector('.map__pin');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
        var card = templateNode.content.cloneNode(true);
        var button = card.querySelector('.map__pin');
        pin = window.pin.renderPin(array[i], i, button);

        fragment.appendChild(pin);
      }
      pins.appendChild(fragment);
    }
  }
})();
