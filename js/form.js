'use strict';

window.form = (function () {
  var dom = window.getdomelements;
  var typeSelect = document.getElementById('type');
  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');
  var roomsSelect = document.getElementById('room_number');
  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');

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


  // var form = userDialog.querySelector('.setup-wizard-form');
  // form.addEventListener('submit', function (evt) {
  //   window.upload(new FormData(form), function (response) {
  //     userDialog.classList.add('hidden');
  //   });
  //   evt.preventDefault();
  // });

  // console.log(adForm);
  // adForm.addEventListener('submit', function (evt) {
  //   successWindow.classList.remove('hidden');
  //   window.upload(new FormData(adForm));
  //   evt.preventDefault();
  // });

// console.log(adForm);



// console.log(new FormData(document.querySelector('.ad-form')));

  adForm.addEventListener('submit', function (evt) {
    adForm.classList.remove('hidden');
    window.upload(new FormData(adForm), function (response) {

      adForm.classList.add('hidden');
      console.log(123);
    });
    evt.preventDefault();
  });
// console.log(adForm);
// console.log(window.upload(new FormData(adForm)));
})();



