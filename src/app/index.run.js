(function() {
  'use strict';

  angular
    .module('drishtiClient')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
