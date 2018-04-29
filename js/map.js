'use strict';

window.map = (function () {
  var HORIZONTAL_MIN = 0;
  var VERTICAL_MIN = 150;
  var VERTICAL_MAX = 500;
  var templateNode = document.querySelector('template');
  var card = templateNode.content.cloneNode(true);
  var map = document.querySelector('.map');
  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var INITIAL_PIN_HEIGHT = 22;
  var initialButton = document.querySelector('.map__pin--main');
  var inactiveMap = document.querySelector('.map');
  var inactiveMapform = document.querySelector('.ad-form');
  var filtersBar = document.querySelector('.map__filters');
  var initialButtonImg = initialButton.querySelector('img');
  var addressInput = document.getElementById('address');
  var mainPinWidth = +initialButton.style.left.slice(0, -2) + initialButtonImg.offsetWidth / 2;
  var mainPinHeight = +initialButton.style.top.slice(0, -2) + initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
  var adverts = [];

  // Заполняет пустой массив объектами с объявлениями
  var getAdverts = function (array, amount) {
    for (var i = 0; i < amount.length; i++) {
      array.push(window.data.createAdvertData(i));
    }
  };

  function pinClickHandler(num) {
    return function () {
      map.insertBefore(window.card.renderCard(num), document.querySelector('.map__filters-container'));

      var closeButton = document.querySelector('.popup__close');

      closeButton.addEventListener('click', closeButtonClickHandler);

      document.addEventListener('keydown', closeButtonKeydownHandler);
    };
  }

  getAdverts(adverts, window.data.BRIEF_TITLES);

  // Выполняем условия неактивного состояния страницы

  var fieldsets = document.querySelectorAll('fieldset');
  var typeSelect = document.getElementById('type');
  var priceInput = document.getElementById('price');
  var capacitySelect = document.getElementById('capacity');

  var setMinPrice = function (num, minPrice, placeHolder) {
    if (typeSelect.selectedIndex === num) {
      priceInput.setAttribute('min', minPrice);
      priceInput.placeholder = placeHolder;
    }
  };

  var setInactiveForm = function () {
    var advertPins = document.querySelectorAll('.map__pin');

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', '');
    }

    for (i = 1; i < advertPins.length; i++) {
      advertPins[i].style.display = 'none';

    }

    filtersBar.style.display = 'none';
    priceInput.setAttribute('min', '1000');
    priceInput.placeholder = '1 000';
    addressInput.value = mainPinWidth + ', ' + mainPinHeight;

    disableCapacityOptions();

    capacitySelect.selectedIndex = 2;
    capacitySelect.children[2].removeAttribute('disabled', '');
  };

  var removeDisabledAttr = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled', '');
    }
  };

  function initialButtonMouseupHandler() {
    var initPins = document.querySelectorAll('.map__pin');

    inactiveMap.classList.remove('map--faded');
    inactiveMapform.classList.remove('ad-form--disabled');
    filtersBar.classList.remove('visually-hidden');

    removeDisabledAttr(fieldsets);

    for (var i = 1; i < initPins.length; i++) {
      initPins[i].style.display = 'block';
    }

    filtersBar.style.display = 'flex';
  }

  function initialButtonKeydownHandler(evt) {
    if (evt.keyCode === KEY_ENTER) {
      initialButtonMouseupHandler();
    }
  }

  // Вешаем обработчик событий на кнопку с пирожком для активтого состояния
  initialButton.addEventListener('mouseup', initialButtonMouseupHandler);
  initialButton.addEventListener('keydown', initialButtonKeydownHandler);

  function closeButtonClickHandler() {
    var openedCard = document.querySelector('.map__card');

    openedCard.classList.add('visually-hidden');
  }

  function closeButtonKeydownHandler(evt) {
    if (evt.keyCode === KEY_ESC) {
      closeButtonClickHandler();
    }
  }

  // Обработчик событий на инпут с ценой и селектом выбора типа жилья
  typeSelect.addEventListener('change', function () {
    setMinPrice(0, '1000', '1 000');
    setMinPrice(1, '0', '0');
    setMinPrice(2, '5000', '5 000');
    setMinPrice(3, '10000', '10 000');
  });

  var timeInSelect = document.getElementById('timein');
  var timeOutSelect = document.getElementById('timeout');

  timeOutSelect.addEventListener('change', function () {

    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  timeInSelect.addEventListener('change', function () {

    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });


  var roomsSelect = document.getElementById('room_number');

  var addCapacityOption = function (from, to) {
    for (var i = from; i <= to; i++) {
      capacitySelect.children[i].removeAttribute('disabled', '');
    }

    capacitySelect.selectedIndex = to;
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
      addCapacityOption(3, 3);
    }
  });

  var adForm = document.querySelector('.ad-form');
  var successWindow = document.querySelector('.success');

  adForm.addEventListener('submit', function () {
    successWindow.classList.remove('hidden');
  });

  initialButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var offsetXY = map.getBoundingClientRect();

    var startCoords = {
      x: evt.clientX - offsetXY.left,
      y: evt.clientY - offsetXY.top
    };

    var initialButtonMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - (moveEvt.clientX - offsetXY.left),
        y: startCoords.y - (moveEvt.clientY - offsetXY.top)
      };
      var offsetX = initialButtonImg.offsetWidth / 2;
      var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
      var pinCurrentX = moveEvt.clientX - shift.x - offsetXY.left - offsetX;
      var pinCurrentY = moveEvt.clientY - shift.y - offsetXY.top - offsetY / 2;
      var posXY = tracePinPen(pinCurrentX, pinCurrentY);

      startCoords = {
        x: moveEvt.clientX - offsetXY.left,
        y: moveEvt.clientY - offsetXY.top
      };

      initialButton.style.left = posXY.x + 'px';
      initialButton.style.top = posXY.y + 'px';

      addressInput.value = posXY.x + offsetX + ', ' + (posXY.y + offsetY);
    };

    function tracePinPen(x, y) {
      var mapWidth = map.offsetWidth;
      var pinOffsetX = initialButtonImg.offsetWidth;
      var posX = x;
      var posY = y;
      var offsetY = initialButtonImg.offsetHeight + INITIAL_PIN_HEIGHT;
      var pinOffsetY = VERTICAL_MAX - offsetY;

      if (x < HORIZONTAL_MIN) {
        posX = HORIZONTAL_MIN;
      }

      if (x > mapWidth - pinOffsetX) {
        posX = mapWidth - pinOffsetX;
      }

      if (y < VERTICAL_MIN) {
        posY = VERTICAL_MIN - offsetY;
      }

      if (y > pinOffsetY) {
        posY = pinOffsetY;
      }
      return {x: parseInt(posX, 10), y: parseInt(posY, 10)};
    }

    var initialButtonMouseupMoveHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', initialButtonMousemoveHandler);
      document.removeEventListener('mouseup', initialButtonMouseupMoveHandler);
    };

    document.addEventListener('mousemove', initialButtonMousemoveHandler);
    document.addEventListener('mouseup', initialButtonMouseupMoveHandler);
  });

  return {
    adverts: adverts,
    templateNode: templateNode,
    card: card,
    map: map,
    pinClickHandler: pinClickHandler,
    setInactiveForm: setInactiveForm,
  };
})();
