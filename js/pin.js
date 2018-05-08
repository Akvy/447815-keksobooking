'use strict';

(function () {
  window.renderPin = function (element, num, pin) {
    var img = pin.querySelector('img');
    var clickEvent = window.pinClickHandler(num, element);
    var pinOffsetLeft = 25;
    var pinOffsetTop = 70;

    console.log(pinOffsetTop);

    pin.style.left = (element.location.x - pinOffsetLeft) + 'px';
    pin.style.top = (element.location.y - pinOffsetTop) + 'px';
    img.src = element.author.avatar;
    img.alt = element.offer.title;

    pin.addEventListener('click', clickEvent);

    return pin;
  };
})();
