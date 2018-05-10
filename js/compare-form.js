'use strict';

(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };
  var domElements = window.domElements.getDomElements();
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var featureButtons = housingFeatures.querySelectorAll('input');

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

    var buttonValues = Array.from(featureButtons).filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    });

    function isSameFeatures(element) {
      for (var i = 0; i < buttonValues.length; i++) {
        var isExist = element.offer.features.some(function (item) {
          return buttonValues[i] === item;
        });
        if (!isExist) {
          return false;
        }
      }
      return element.offer.features.length >= buttonValues.length;
    }

    var filteredAdverts = window.adverts.filter(function (item) {
      return compareType(item) && comparePrice(item) && compareRooms(item) && compareGuests(item) && isSameFeatures(item);
    });

    window.removeAllPins();

    if (mapCard) {
      mapCard.remove();
    }
    window.makePins(filteredAdverts);
  }

  domElements.filtersBar.addEventListener('change', function () {
    window.debounce.removeBounce(changePins);
  });
})();
