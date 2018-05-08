'use strict';

(function () {
  window.renderPin = function (element, num, pin) {
    var Pin = {
      WIDTH: 50,
      HEIGHT: 70
    };
    var img = pin.querySelector('img');
    var pinLeftOffset = Math.round(Pin.WIDTH / 2);
    var clickEvent = window.pinClickHandler(num, element);

    pin.style.left = (element.location.x - pinLeftOffset) + 'px';
    pin.style.top = (element.location.y - Pin.HEIGHT) + 'px';
    img.src = element.author.avatar;
    img.alt = element.offer.title;

    pin.addEventListener('click', clickEvent);

    return pin;
  };
})();
