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

  function compareType(i) { //i вставить потом
    return housingType.value === 'any' || housingType.value === window.map.adverts[i].offer.type ? true : false;
  }

  function comparePrice(i) { //i вставить потом
    if (window.map.adverts[i].offer.price < 10000) {
      window.map.adverts[i].offer.price = 'low';
    } else if (window.map.adverts[i].offer.price < 50000) {
      window.map.adverts[i].offer.price = 'middle';
    } else if (window.map.adverts[i].offer.price > 50000) {
      window.map.adverts[i].offer.price = 'high';
    }

    return housingPrice.value === 'any' || housingPrice.value === window.map.adverts[i].offer.price ? true : false;
  }

  function compareRooms(i) { //i вставить потом
    if (window.map.adverts[i].offer.rooms === 1) {
      window.map.adverts[i].offer.rooms = '1';
    } else if (window.map.adverts[i].offer.rooms === 2) {
      window.map.adverts[i].offer.rooms = '2';
    } else if (window.map.adverts[i].offer.rooms >= 3) {
      window.map.adverts[i].offer.rooms = '3';
    }

    return housingRooms.value === 'any' || housingRooms.value === window.map.adverts[i].offer.rooms ? true : false;
  }

  function compareGuests(i) { //i вставить потом
    if (window.map.adverts[i].offer.guests === 1) {
      window.map.adverts[i].offer.guests = '1';
    } else if (window.map.adverts[i].offer.guests === 2) {
      window.map.adverts[i].offer.guests = '2';
    } else if (window.map.adverts[i].offer.guests > 2) {
      window.map.adverts[i].offer.guests = 'any';
    }

    return housingGuests.value === 'any' || housingGuests.value === window.map.adverts[i].offer.guests ? true : false;
  }


  // function checkFeature() { //i вставить потом + параметр фичи
  //   if (wifiCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'wifi'; }).length) {
  //     return true;
  //   }
  //   return false;
  // }


  function checkWifi(i) { //i вставить потом + параметр фичи
    if (wifiCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'wifi'; }).length) {
      return true;
    }
    return false;
  }


  function checkDishwasher(i) { //i вставить потом + параметр фичи
    if (dishwasherCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'dishwasher'; }).length) {
      return true;
    }
    return false;
  }

    function checkParking(i) { //i вставить потом + параметр фичи
    if (parkingCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'parking'; }).length) {
      return true;
    }
    return false;
  }

    function checkWasher(i) { //i вставить потом + параметр фичи
    if (washerCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'washer'; }).length) {
      return true;
    }
    return false;
  }

    function checkElevator(i) { //i вставить потом + параметр фичи
    if (elevatorCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'elevator'; }).length) {
      return true;
    }
    return false;
  }

    function checkConditioner(i) { //i вставить потом + параметр фичи
    if (conditionerCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'conditioner'; }).length) {
      return true;
    }
    return false;
  }

  // function checkAdvert() {
  //   for (var i = 0; i < window.map.adverts.length; i++) {
  //     if (compareType(i) && comparePrice(i)) {
  //       renderPin()
  //     }
  //   }

  // }


  dom.filtersBar.addEventListener('change', function () {

  // for (var i = 0; i < window.map.adverts.length; i++) {
  //   console.log(checkConditioner(i));

  // }

 console.log(window.map.adverts[0]);
 // console.log(checkFeaturedishwasher());
  });
})();


