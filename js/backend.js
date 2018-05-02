'use strict';

window.backend = (function () {
  var URL = 'https://js.dump.academy/keksobooking/';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 8000;
    var adForm = document.querySelector('.ad-form');

  window.adverts = [];

  // var onLoad = function (data) {
  //   var serverAdverts = data;

  //   console.log(serverAdverts);
  // };

  window.onLoad = function (data) {
    var serverAdverts = data;

    // console.log(serverAdverts, serverAdverts[0], serverAdverts[1]);

    // return serverAdverts;

    getAdverts(serverAdverts);
// console.log(getAdverts(serverAdverts));
    // return adverts;
  };

  window.onError = function (message) {
    console.log(message);
  };

        // var adverts;

  window.load = function (success, error) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          // success(xhr.status);
          success(xhr.response);

       //    for (var i = 0; i <  window.load(onLoad, onError).length; i++) {
       //   adverts.push(window.load(onLoad, onError)(i));
       // }
       // return adverts;

          // xhr.response
          // console.log(xhr.response);
          // adverts = xhr.response;
          // return xhr.response;
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        case 500:
          error = 'Внутренняя ошибка сервера';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Ошибка, превышено время ожидания ответа в ' + xhr.timeout + ' мс');
      });

      xhr.timeout = TIMEOUT;

      // return xhr.response;
    });

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

      xhr.send();
  };

  window.upload = function (data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.status);
          onLoad(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;

        case 404:
          error = 'Ничего не найдено';
          break;

        case 500:
          error = 'Внутренняя ошибка сервера';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }

    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ошибка, превышено время ожидания ответа в ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 8000;

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };


// var tmpFunc = window.load(onSuccess, onError);

      // console.log(onSuccess());

      // function getWhenReady (func) {
      //   return {
      //     item1: func[0]

      //   };
      // }

      // window.load(onError);
// console.log(getWhenReady());
// window.load(function () {
//   console.log(123);
// });

// window.load(onLoad, onError);

  function getAdverts(data) {
    var adverts = [];
    // window.load(onLoad, onError);
    // console.log( window.load(onLoad, onError));

    // for (var i = 0; i <  window.load(onLoad, onError).length; i++) {
    //   adverts.push(window.load(onLoad, onError)(i));
    // }

    for (var i = 0; i <  data.length; i++) {
      adverts.push(data[i]);

      // console.log(data[i], 123);
    }
console.log(adverts);
  makePins(adverts);
    // return adverts;
  }

  // function makePins() {
  //   var templateNode = document.querySelector('template');
  //   var pins = document.querySelector('.map__pins');
  //   var pin = templateNode.content.querySelector('.map__pin');
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < window.map.advertsDone.length; i++) {
  //     var card = templateNode.content.cloneNode(true);
  //     var button = card.querySelector('.map__pin');
  //     pin = window.pin.renderPin(window.map.advertsDone[i], i, button);

  //     fragment.appendChild(pin);
  //   }
  //   pins.appendChild(fragment);
  // }


  function makePins(array) {
    var templateNode = document.querySelector('template');
    var pins = document.querySelector('.map__pins');
    var pin = templateNode.content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var card = templateNode.content.cloneNode(true);
      var button = card.querySelector('.map__pin');
      pin = window.pin.renderPin(array[i], i, button);

      fragment.appendChild(pin);
    }
    pins.appendChild(fragment);
  }


// window.load(onLoad, onError);

console.log(window.load(onLoad, onError), adverts, adverts[1]);

// console.log(adverts);

// console.log(window.load(onLoad, onError), adverts, getAdverts());




// window.load(onLoad, onError);



//   console.log(adverts, adverts);

  // getAdverts();

// getWhenReady(window.load(onLoad, onError));

// getWhenReady(window.load(onLoad, onError));

// console.log(window.load(onLoad, onError));
    //   window.upload(new FormData(adForm), function (response) {

    //   adForm.classList.add('hidden');
    //   console.log(123);
    // });

    // return {
    //   advertsServ: setTimeout(function() {
    //     console.log(adverts, adverts[1], adverts[2], adverts[3]);
    //   }, TIMEOUT)
    // };

    // return {
    //   adverts: adverts
    // }
})();


