(function () {
    'use strict';

    angular
        .module('drishtiClient')
        .service('dataFactory', ['$http',dataFactory]);

    /** @ngInject */
    function dataFactory($http) {
        var urlBase = 'http://localhost:8080/actions';

        this.getActions = function () {
            return $http.get(urlBase);
        };
    }

})();
