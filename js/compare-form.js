'use strict';

window.compareForm = (function () {
  var dom = window.domElements;
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

  function compareType(element) {
    return housingType.value === 'any' || housingType.value === element.offer.type;
  }

  function comparePrice(element) {
    if (element.offer.price < 10000) {
      element.offer.price = 'low';
    } else if (element.offer.price < 50000) {
      element.offer.price = 'middle';
    } else if (element.offer.price >= 50000) {
      element.offer.price = 'high';
    }

    return housingPrice.value === 'any' || housingPrice.value === element.offer.price;
  }

  function compareRooms(element) {
    return housingRooms.value === 'any' || +housingRooms.value === element.offer.rooms;
  }

  function compareGuests(element) {
    return housingGuests.value === 'any' || +housingGuests.value === element.offer.guests;
  }


  function checkFeature() { //i вставить потом + параметр фичи
    if (wifiCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'wifi'; }).length) {
      return true;
    }
    return false;
  }


  function checkWifi(i) {
    if (wifiCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'wifi'; }).length) {
      return true;
    }
    return false;
  }


  function checkDishwasher(i) {
    if (dishwasherCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'dishwasher'; }).length) {
      return true;
    }
    return false;
  }

    function checkParking(i) {
    if (parkingCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'parking'; }).length) {
      return true;
    }
    return false;
  }

    function checkWasher(i) {
    if (washerCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'washer'; }).length) {
      return true;
    }
    return false;
  }

    function checkElevator(i) {
    if (elevatorCheckbox.checked && window.map.adverts[i].offer.features.filter(function (item) { return item === 'elevator'; }).length) {
      return true;
    }
    return false;
  }

    function checkConditioner(i) {
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

  for (var i = 0; i < window.map.adverts.length; i++) {
    console.log(compareGuests(window.map.adverts[i]));
  }

  console.log(housingRooms.value, typeof housingRooms.value);
console.log(window.map.adverts);
 // console.log(window.map.adverts[0]);
 // console.log(checkFeaturedishwasher());
  });
})();
