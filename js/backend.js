'use strict';

window.backend = (function () {
  var TIMEOUT = 8000;
  var SHOW_TIME = 1500;
  var URL = 'https://js.dump.academy/keksobooking/';
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  return {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var error;

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Code.SUCCESS:
            onSuccess(xhr.response);
            break;

          case Code.BAD_REQUEST:
            error = 'Ошибка ' + xhr.status + ': Неверный запрос';
            break;

          case Code.NOT_FOUND:
            error = 'Ошибка ' + xhr.status + ': Ничего не найдено';
            break;

          case Code.SERVER_ERROR:
            error = 'Ошибка ' + xhr.status + ': Внутренняя ошибка сервера';
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

      xhr.timeout = TIMEOUT;

      xhr.open('GET', (URL + 'data'));
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var error;

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Code.SUCCESS:
            onSuccess();
            break;

          case Code.BAD_REQUEST:
            error = 'Ошибка ' + xhr.status + ': Неверный запрос';
            break;

          case Code.NOT_FOUND:
            error = 'Ошибка ' + xhr.status + ': Ничего не найдено';
            break;

          case Code.SERVER_ERROR:
            error = 'Ошибка ' + xhr.status + ': Внутренняя ошибка сервера';
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

      xhr.timeout = TIMEOUT;

      xhr.open('POST', URL);
      xhr.send(data);
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
      }, SHOW_TIME);
    }
  };
})();
