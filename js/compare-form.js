'use strict';

window.compareForm = (function () {
  var dom = window.domElements;
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');
  var featureButtons = housingFeatures.querySelectorAll('input');

  // console.log(faetureButtons);

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

  console.log(buttonValues);

  var advertsFeatures = window.map.adverts.map(function(element) {
    return element.offer.features;
  });

  function isSameFeatures() {
    var flag = true;
    console.log(123);
    advertsFeatures.forEach(function(elem) {
      if(!buttonValues.some(function (elem1) { return elem === elem1 })) {
      flag = false;
    }
  });
    return flag;
  }

  // console.log(isSameFeatures());

  var filteredAdverts = window.map.adverts.filter(function(item) {
    return compareType(item) && comparePrice(item) && compareRooms(item) && compareGuests(item) && isSameFeatures();
  });

  window.pins.removeAllPins();

  if (mapCard) {
    mapCard.remove();
  }

  window.pins.makePins(filteredAdverts);

  });
})();
