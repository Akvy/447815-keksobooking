'use strict';

(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  function compareType(element) {
    return housingType.value === 'any' || housingType.value === element.offer.type;
  }

  function comparePrice(element) {
    var elementPrice = element.offer.price;
    if (elementPrice < Price.LOW) {
      elementPrice = 'low';
    } else if (elementPrice >= Price.LOW && elementPrice < Price.HIGH) {
      elementPrice = 'middle';
    } else if (elementPrice >= Price.HIGH) {
      elementPrice = 'high';
    }

    return housingPrice.value === 'any' || housingPrice.value === elementPrice;
  }

  function compareRooms(element) {
    return housingRooms.value === 'any' || +housingRooms.value === element.offer.rooms;
  }

  function compareGuests(element) {
    return housingGuests.value === 'any' || +housingGuests.value === element.offer.guests;
  }

  function changePins() {
    var mapCard = document.querySelector('.map__card');

    function isSameFeatures(element) {
      var featureButtons = housingFeatures.querySelectorAll('input:checked');

      for (var i = 0; i < featureButtons.length; i++) {
        var isExist = element.offer.features.some(function (item) {
          return featureButtons[i].value === item;
        });
        if (!isExist) {
          return false;
        }
      }
      return element.offer.features.length >= featureButtons.length;
    }

    var filteredAdverts = window.map.adverts.filter(function (item) {
      return compareType(item) && comparePrice(item) && compareRooms(item) && compareGuests(item) && isSameFeatures(item);
    });

    window.pins.removeAll();

    if (mapCard) {
      mapCard.remove();
    }
    window.pins.makeAll(filteredAdverts);
  }

  window.compareForm = {
    filtersBarChangeHandler: function () {
      window.debounce.removeBounce(changePins);
      document.removeEventListener('keydown', window.map.closeButtonKeydownHandler);
    }
  };
})();
