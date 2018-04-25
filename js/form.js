'use strict';

window.form = (function () {
  var roomsSelect = document.getElementById('room_number');

  var addCapacityOption = function (from, to) {
  for (var i = from; i <= to; i++) {
    capacitySelect.children[i].removeAttribute('disabled', '');
  }
  };

  function disableCapacityOptions() {
    for (var i = 0; i < capacitySelect.children.length; i++) {
      capacitySelect.children[i].setAttribute('disabled', '');
    }
  }

  roomsSelect.addEventListener('change', function (evt) {
  var target = evt.target;

  disableCapacityOptions();

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
    capacitySelect.selectedIndex = 3;
    addCapacityOption(3, 3);
  }
  });

  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');

  adForm.addEventListener('submit', function () {
  successWindow.classList.remove('hidden');
  });

  return {
    disableCapacityOptions: disableCapacityOptions
  };
})();
