'use strict';

window.backend = (function () {
  var TIMEOUT = 8000;
  var URL = 'https://js.dump.academy/keksobooking/';

  // window.onLoad = function (data) {
  //   var serverAdverts = data;

  //   // getAdverts(serverAdverts);
  // };

  window.upload = function (data, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // var error;

      switch (xhr.status) {
        case 200:
          // data(xhr.status);
          console.log(xhr.status);
          // onLoad(xhr.response);
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
        error(error);
      }

    });

    xhr.addEventListener('error', function () {
      error('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      error('Ошибка, превышено время ожидания ответа в ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  return {
    load: function (success, error) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        // var error;

        switch (xhr.status) {
          case 200:
            success(xhr.response);
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
          window.backend.onError(error);
        }

        xhr.addEventListener('error', function () {
          error('Ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
          error('Ошибка, превышено время ожидания ответа в ' + xhr.timeout + ' мс');
        });

        xhr.timeout = TIMEOUT;
      });

      xhr.open('GET', (URL + 'data'));
      xhr.send();
    },
    onError: function (message) {
      console.log(message);
    }
  };
})();


