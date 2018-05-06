'use strict';

window.compareForm = (function () {
  var dom = window.domElements;
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');
  var faetureButtons = housingFeatures.querySelectorAll('input');

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

  function compareFeatures(element) {

  }

  dom.filtersBar.addEventListener('change', function () {
  var mapCard = document.querySelector('.map__card');

  function getFeatureButtons (element) {
    return element.join() === buttonValues.join();
  }
  // console.log(advertsFeatures.some(getFeatureButtons), advertsFeatures);

  var buttonValues = Array.from(faetureButtons).filter(function (element) {
    return element.checked;
  }).map(function (element) {
    return element.value;
  });

  var advertsFeatures = window.map.adverts.map(function(element) {
    return element.offer.features;
  });

  // console.log(buttonValues, advertsFeatures);

  var filteredAdverts = window.map.adverts.filter(function(item) {
    return compareType(item) && comparePrice(item) && compareRooms(item) && compareGuests(item);
  });

  // console.log(filteredAdverts);

  // console.log(advertsFeatures);

  window.pins.removeAllPins();

  if (mapCard) {
    mapCard.remove();
  }

  // function compareAdverts (element) {
  //   return element.join() === buttonValues.join();
  // }

  function compareAdverts (element) {
    return element === buttonValues;
    // console.log(element, buttonValues);
    // console.log(123);
  }

// advertsFeatures[0].some(compareAdverts);
  // console.log(advertsFeatures[0], advertsFeatures[0].some(compareAdverts), buttonValues);

console.log(advertsFeatures[0].join() === buttonValues.join(), advertsFeatures[1].join() === buttonValues.join(), advertsFeatures[2].join() === buttonValues.join());


  // console.log(  advertsFeatures[0].filter(function (element, i) {
  //   return element === buttonValues[i];
  // }));

  // console.log(buttonValues.join() === advertsFeatures[1].join(), advertsFeatures[1], buttonValues);


  // console.log(advertsFeatures[0], advertsFeatures.some(compareAdverts));



  window.pins.makePins(filteredAdverts);

  });
})();
