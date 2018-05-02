'use strict';

window.backend = (function () {
  var URL = 'https://js.dump.academy/keksobooking/';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 8000;
    var adForm = document.querySelector('.ad-form');

  var onSuccess = function (data) {
    var serverAdverts = data;

    console.log(serverAdverts);
  };

  var onError = function (message) {
    console.log(message);
  };

        var adverts;

  window.load = function (success, error) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          // onSuccess(xhr.response);

          adverts = xhr.response;

        // console.log(adverts);
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

      // console.log(xhr.status);



      // console.log(xhr.response[0]);
    });

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');

      xhr.send();
  };

  // console.log(adverts);

setTimeout(function() {
  console.log(adverts, adverts[1], adverts[2], adverts[3]);
}, TIMEOUT);

window.load(onSuccess, onError);


  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // onSuccess(xhr.response);
            var error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
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

    //   window.upload(new FormData(adForm), function (response) {

    //   adForm.classList.add('hidden');
    //   console.log(123);
    // });

    return {
      advertsServ: setTimeout(function() {
        console.log(adverts, adverts[1], adverts[2], adverts[3]);
      }, TIMEOUT)

    };
})();


