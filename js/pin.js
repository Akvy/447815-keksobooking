'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  window.pin = {
    render: function (element, num, pin) {
      var pinImage = pin.querySelector('img');
      var pinLeftOffset = Math.round(Pin.WIDTH / 2);
      var clickEvent = window.map.pinClickHandler(num, element);

      pin.style.left = (element.location.x - pinLeftOffset) + 'px';
      pin.style.top = (element.location.y - Pin.HEIGHT) + 'px';
      pinImage.src = element.author.avatar;
      pinImage.alt = element.offer.title;

      pin.addEventListener('click', clickEvent);

      return pin;
    }
  };
})();
