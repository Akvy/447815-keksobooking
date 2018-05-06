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

  dom.filtersBar.addEventListener('change', function () {
  var mapCard = document.querySelector('.map__card');

  var filteredAdverts = window.map.adverts.filter(function(item) {
    return compareType(item) && comparePrice(item) && compareRooms(item) && compareGuests(item);
  });

  window.pins.removeAllPins();

  if (mapCard) {
    mapCard.remove();
  }

  // if (faetureButtons[0].checked || faetureButtons[1].checked) {
  //   console.log(123);
  // }
  var filteredFeatures = Array.from(faetureButtons).filter(function (element) {
    return element.checked;
  });

  // console.log(filteredFeatures[0]);

  filteredFeatures.filter(function () {

  });

  console.log(filteredFeatures[0] ,filteredAdverts[0].offer.features);

  window.pins.makePins(filteredAdverts);

  });
})();
