'use strict';

window.backend = (function () {
  var TIMEOUT = 8000;
  var URL = 'https://js.dump.academy/keksobooking/';

  window.upload = function (data, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          // console.log(xhr.status);
          break;

        case 400:
          error = 'Ошибка ' + xhr.status + ': Неверный запрос';
          break;

        case 404:
          error = 'Ошибка ' + xhr.status + ': Ничего не найдено';
          break;

        case 500:
          error = 'Ошибка ' + xhr.status + ': Внутренняя ошибка сервера';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        window.backend.onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      error('Ошибка соединения');
      // window.backend.onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      error('Ошибка, превышено время ожидания ответа в ' + xhr.timeout + ' мс');
      // window.backend.onError('Ошибка, превышено время ожидания ответа в ' + xhr.timeout + ' мс');
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
        switch (xhr.status) {
          case 200:
            success(xhr.response);
            break;

          case 400:
            error = 'Ошибка ' + xhr.status + ': Неверный запрос';
            break;

          case 404:
            error = 'Ошибка ' + xhr.status + ': Ничего не найдено';
            break;

          case 500:
            error = 'Ошибка ' + xhr.status + ': Внутренняя ошибка сервера';
            break;

          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }

        if (error) {
          window.backend.onError(error);
        }

        xhr.addEventListener('error', function () {
          error('Ошибка соединения');
          // window.backend.onError(error);
        });

        xhr.addEventListener('timeout', function () {
          error('Ошибка, превышено время ожидания ответа в ' + xhr.timeout + ' мс');
          // window.backend.onError(error);
        });

        xhr.timeout = TIMEOUT;
      });

      xhr.open('GET', (URL + 'data'));
      xhr.send();
    },
    onError: function (message) {
      var mainTag = document.querySelector('main');
      var messageBlock = document.querySelector('.success');
      var fragment = messageBlock.cloneNode(true);
      var fragmentParagraph = fragment.querySelector('p');
      fragmentParagraph.textContent = message;
      fragment.classList.remove('hidden');
      mainTag.insertBefore(fragment, messageBlock);

      setTimeout(function () {
        fragment.remove();
      }, 1500);
    }
  };
})();
