'use strict';

(function () {
  window.getDomElements = function () {
    return {
      map: document.querySelector('.map'),
      priceInput: document.getElementById('price'),
      templateNode: document.querySelector('template'),
      filtersBar: document.querySelector('.map__filters'),
      addressInput: document.getElementById('address'),
      capacitySelect: document.getElementById('capacity'),
      mapFiltersContainer: document.querySelector('.map__filters-container'),
      initialButton: document.querySelector('.map__pin--main'),
      inactiveMapform: document.querySelector('.ad-form'),
      fieldsets: document.querySelectorAll('fieldset')
    };
  };
})();
