'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = {
    add: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    }
  };
})();
