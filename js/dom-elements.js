'use strict';

(function () {
  window.domElements = {
    getDomElements: function () {
      return {
        map: document.querySelector('.map'),
        priceInput: document.querySelector('#price'),
        templateNode: document.querySelector('template'),
        filtersBar: document.querySelector('.map__filters'),
        addressInput: document.querySelector('#address'),
        capacitySelect: document.querySelector('#capacity'),
        mapFiltersContainer: document.querySelector('.map__filters-container'),
        initialButton: document.querySelector('.map__pin--main'),
        inactiveMapform: document.querySelector('.ad-form'),
        fieldsets: document.querySelectorAll('fieldset')
      };
    }
  };
})();
