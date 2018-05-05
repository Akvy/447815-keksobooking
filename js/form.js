'use strict';

window.form = (function () {
  var SHOW_TIME = 1500;
  var dom = window.domElements;
  var typeSelect = document.getElementById('type');
  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');
  var roomsSelect = document.getElementById('room_number');
  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');

  function showSuccess() {
    successWindow.classList.remove('hidden');

    setTimeout(function () {
      successWindow.classList.add('hidden');
      adForm.reset();
      window.initialPin.getInititalPinCoords();
    }, SHOW_TIME);
  }

  var setMinPrice = function (num, minPrice, placeHolder) {
    if (typeSelect.selectedIndex === num) {
      dom.priceInput.setAttribute('min', minPrice);
      dom.priceInput.placeholder = placeHolder;
    }
  };

  typeSelect.addEventListener('change', function () {
    setMinPrice(0, '1000', '1 000');
    setMinPrice(1, '0', '0');
    setMinPrice(2, '5000', '5 000');
    setMinPrice(3, '10000', '10 000');
  });

  var addCapacityOption = function (from, to) {
    for (var i = from; i <= to; i++) {
      dom.capacitySelect.children[i].removeAttribute('disabled', '');
    }

    dom.capacitySelect.selectedIndex = to;
  };

  roomsSelect.addEventListener('change', function (evt) {
    var target = evt.target;

    window.map.disableCapacityOptions();

    if (!target.selectedIndex) {
      addCapacityOption(2, 2);
    }

    if (target.selectedIndex === 1) {
      addCapacityOption(1, 2);
    }

    if (target.selectedIndex === 2) {
      addCapacityOption(0, 2);
    }

    if (target.selectedIndex === 3) {
      addCapacityOption(3, 3);
    }
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), showSuccess, window.backend.onError);
  });

  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');
  var wifiCheckbox = document.getElementById('filter-wifi');
  var dishwasherCheckbox = document.getElementById('filter-dishwasher');
  var parkingCheckbox = document.getElementById('filter-parking');
  var washerCheckbox = document.getElementById('filter-washer');
  var elevatorCheckbox = document.getElementById('filter-elevator');
  var conditionerCheckbox = document.getElementById('filter-conditioner');

  // console.log(housingFeatures);



  function compareType() { //i вставить потом
    return housingType.value === 'any' || housingType.value === window.map.adverts[0].offer.type ? true : false;
  }

  function comparePrice() { //i вставить потом
    if (window.map.adverts[3].offer.price < 10000) {
      window.map.adverts[3].offer.price = 'low';
    } else if (window.map.adverts[3].offer.price < 50000) {
      window.map.adverts[3].offer.price = 'middle';
    } else if (window.map.adverts[3].offer.price > 50000) {
      window.map.adverts[3].offer.price = 'high';
    }

    return housingPrice.value === 'any' || housingPrice.value === window.map.adverts[3].offer.price ? true : false;
  }

  function compareRooms() { //i вставить потом
    if (window.map.adverts[2].offer.rooms === 1) {
      window.map.adverts[2].offer.rooms = '1';
    } else if (window.map.adverts[2].offer.rooms === 2) {
      window.map.adverts[2].offer.rooms = '2';
    } else if (window.map.adverts[2].offer.rooms >= 3) {
      window.map.adverts[2].offer.rooms = '3';
    }

    return housingRooms.value === 'any' || housingRooms.value === window.map.adverts[2].offer.rooms ? true : false;
  }

  function compareGuests() { //i вставить потом
    if (window.map.adverts[5].offer.guests === 1) {
      window.map.adverts[5].offer.guests = '1';
    } else if (window.map.adverts[5].offer.guests === 2) {
      window.map.adverts[5].offer.guests = '2';
    } else if (window.map.adverts[5].offer.guests > 2) {
      window.map.adverts[5].offer.guests = 'any';
    }

    return map.adverts[5].offer.guests === 'any' || housingGuests.value === window.map.adverts[5].offer.guests ? true : false;
  }

  function checkFeature() { //i вставить потом + параметр фичи
    if (wifiCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'wifi'; }).length) {
      return true;
    }
    return false;
  }

    function checkFeaturedishwasher() { //i вставить потом + параметр фичи
    if (dishwasherCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'dishwasher'; }).length) {
      return true;
    }
    return false;
  }

    function checkFeatureparking() { //i вставить потом + параметр фичи
    if (parkingCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'parking'; }).length) {
      return true;
    }
    return false;
  }

    function checkFeaturewasher() { //i вставить потом + параметр фичи
    if (washerCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'washer'; }).length) {
      return true;
    }
    return false;
  }

    function checkFeatureelevator() { //i вставить потом + параметр фичи
    if (elevatorCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'elevator'; }).length) {
      return true;
    }
    return false;
  }

    function checkFeatureconditioner() { //i вставить потом + параметр фичи
    if (conditionerCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'conditioner'; }).length) {
      return true;
    }
    return false;
  }

  setTimeout(function() {
    // window.pins.makePins(window.map.adverts);
  }, 1500);



  dom.filtersBar.addEventListener('change', function () {

    var target = event.target;

        // var pins = document.querySelectorAll('.map__pin');

        // Array.from(pins)
        // console.log(pins.length, pins[1]);
 // console.log(window.map.adverts)

  window.pins.makePins(window.map.adverts);
 if (compareType() && comparePrice() && compareRooms() && compareGuests() && checkFeature() && checkFeaturedishwasher() && checkFeatureparking() && checkFeaturewasher() && checkFeatureelevator() && checkFeatureconditioner()) {


  console.log(123);
 }



// window.backend.load(window.pins.makePins, window.backend.onError);
console.log(compareType());
console.log(comparePrice());
console.log(compareRooms());
console.log(compareGuests());
console.log(checkFeature(), checkFeaturedishwasher(), checkFeatureparking(), checkFeaturewasher(), checkFeatureelevator(), checkFeatureconditioner());
  });
})();


