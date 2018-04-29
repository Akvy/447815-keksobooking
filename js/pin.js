'use strict';

window.pin = (function () {
  var renderPin = function (num, pin) {
    var img = pin.querySelector('img');

    pin.style.left = window.map.adverts[num].location.x + 'px';
    pin.style.top = window.map.adverts[num].location.y + 'px';
    img.src = window.map.adverts[num].author.avatar;
    img.alt = window.map.adverts[num].offer.title;

    pin.addEventListener('click', window.map.pinClickHandler(num));

    return pin;
  };

  function makePins() {
    var templateNode = document.querySelector('template');
    var pins = document.querySelector('.map__pins');
    var pin = templateNode.content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.BRIEF_TITLES.length; i++) {
      var card = templateNode.content.cloneNode(true);
      var button = card.querySelector('.map__pin');
      pin = renderPin(i, button);

      fragment.appendChild(pin);
    }
    pins.appendChild(fragment);
  }

  makePins();
  window.map.setInactiveForm();

  return {
    renderPin: renderPin,
    makePins: makePins
  };
})();


