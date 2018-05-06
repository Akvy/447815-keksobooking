'use strict';

window.compareForm = (function () {
  var dom = window.domElements;
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');
  var featureButtons = housingFeatures.querySelectorAll('input');

  function compareType(element) {
    return housingType.value === 'any' || housingType.value === element.offer.type;
  }

  function comparePrice(element) {
    var elementPrice = element.offer.price;
    if (elementPrice < 10000) {
      elementPrice = 'low';
    } else if (elementPrice >= 10000 && elementPrice < 50000) {
      elementPrice = 'middle';
    } else if (elementPrice >= 50000) {
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

  var debounce = function (fun) {
    var DEBOUNCE_INTERVAL = 3000;
    var lastTimeout;
    // console.log(123);

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  dom.filtersBar.addEventListener('change', function () {
    var mapCard = document.querySelector('.map__card');

    // function getFeatureButtons (element) {
    //   return element.join() === buttonValues.join();
    // }
    // console.log(advertsFeatures.some(getFeatureButtons), advertsFeatures);

    // var buttonValues = Array.from(featureButtons).filter(function (element) {
    //   return element.checked;
    // });

    var buttonValues = Array.from(featureButtons).filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    });

    // var advertsFeatures = window.map.adverts.map(function (element) {
    //   return element.offer.features;
    // });

    function isSameFeatures(element) {
      var flag = true;
      // console.log(123);
      buttonValues.forEach(function (elem) {
        if (!element.offer.features.some(function (elem1) {
          return elem === elem1;
        })) {
          flag = false;
        }
      });
      return flag;
    }

    var filteredAdverts = window.map.adverts.filter(function (item) {
      return compareType(item) && comparePrice(item) && compareRooms(item) && compareGuests(item) && isSameFeatures(item);
    });

    window.pins.removeAllPins();

    if (mapCard) {
      mapCard.remove();
    }

    debounce(window.pins.makePins(filteredAdverts));

    // window.pins.makePins(filteredAdverts);

  });
})();
