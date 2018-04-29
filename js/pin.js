'use strict';

window.pin = (function () {

  return {
    renderPin: function (num, pin) {
      var img = pin.querySelector('img');

      pin.style.left = window.map.returnMapData().adverts[num].location.x + 'px';
      pin.style.top = window.map.returnMapData().adverts[num].location.y + 'px';
      img.src = window.map.returnMapData().adverts[num].author.avatar;
      img.alt = window.map.returnMapData().adverts[num].offer.title;

      pin.addEventListener('click', window.map.pinClickHandler(num));

      return pin;
    }
  };
})();


