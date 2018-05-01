'use strict';

window.pin = (function () {
  return {
    renderPin: function (element, num, pin) {
      var img = pin.querySelector('img');

      pin.style.left = element.location.x + 'px';
      pin.style.top = element.location.y + 'px';
      img.src = element.author.avatar;
      img.alt = element.offer.title;

      pin.addEventListener('click', window.map.pinClickHandler(num));

      return pin;
    }
  };
})();
