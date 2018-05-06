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

  var checkboxes = [
    wifiCheckbox.checked,
    dishwasherCheckbox.checked,
    parkingCheckbox.checked,
    washerCheckbox.checked,
    elevatorCheckbox.checked,
    conditionerCheckbox.checked
  ]

  // function checkFeature() { //i вставить потом + параметр фичи
  //   if (wifiCheckbox.checked && window.map.adverts[0].offer.features.filter(function (item) { return item === 'wifi'; }).length) {
  //     return true;
  //   }
  //   return false;
  // }


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

  // Array.prototype.diff = function(arr2) {
  //   var ret = [];
  //   this.sort();
  //   arr2.sort();
  //   for(var i = 0; i < this.length; i += 1) {
  //       if(arr2.indexOf(this[i]) > -1){
  //           ret.push(this[i]);
  //       }
  //   }
  //   return ret;
  // };

  dom.filtersBar.addEventListener('change', function () {

  var filteredAdverts = window.map.adverts.filter(function(item) {
    return compareType(item) && comparePrice(item) && compareRooms(item) && compareGuests(item);
  });


  // var Arr2 = filteredAdverts.slice();

  window.pins.removeAllPins();
  // var pinRender = window.card.renderCard(0, filteredAdverts[0]);
  // dom.map.insertBefore(pinRender, dom.mapFiltersContainer);
  window.pins.makePins(filteredAdverts);
  });
})();
