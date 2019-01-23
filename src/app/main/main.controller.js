(function () {
  'use strict';

  angular
    .module('drishtiClient')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log,$filter, dataFactory) {
    var vm = this;

    vm.actions = {};
    vm.actionData=[]
    vm.initActionData = [];

    vm.selectedAction='Any';
    vm.selectedDish='Any';
    vm.selectedStation='Any';

    vm.viewby = 5;
    vm.currentPage = 4;
    vm.itemsPerPage = vm.viewby;
    vm.maxSize = 6; //Number of pager buttons to show

    vm.actionlabels = [];
    vm.dishlabels = [];
    vm.stationlabels = [];

    vm.actionFilters = [];
    vm.dishFilters = [];
    vm.stationFilters = [];
    vm.actiondata = [];
    vm.dishdata = [];
    vm.stationdata = [];
    vm.options = {legend: {display: true}};

    vm.setPage = function (pageNo) {
      vm.currentPage = pageNo;
    };

    vm.pageChanged = function () {
    };

    vm.setItemsPerPage = function (num) {
      vm.viewby = num;
      vm.itemsPerPage = num;
      vm.currentPage = 1; //reset to first page
    }

    vm.onFilterChange= function(){

      if(vm.selectedAction==='Any'){
        vm.actionData=vm.initActionData;
      }else{
        vm.actionData= $filter('filter')(vm.initActionData,vm.selectedAction);
      }

      if(vm.selectedDish==='Any'){
        vm.actionData=vm.actionData;
      }else{
        vm.actionData= $filter('filter')(vm.actionData,vm.selectedDish);
      }

      if(vm.selectedStation==='Any'){
        vm.actionData=vm.actionData;
      }else{
        vm.actionData= $filter('filter')(vm.actionData,vm.selectedStation);
      }
      // vm.actionData= $filter('filter')(vm.ac,vm.selectedAction);
      // vm.actionData= $filter('filter')(vm.initActionData,vm.selectedAction);
    }

    function getData() {
      $log.info('Factory', dataFactory);
      dataFactory.getActions().then(function (data) {
        $log.info('Action Data', data);
        vm.actions = data.data;
        vm.initActionData=vm.actions.data;
        vm.actionData=vm.actions.data.slice();
        // vm.totalItems = data.data.actionCount;

        for (let key in data.data.dishes) {
          vm.dishlabels.push(key);
          vm.dishdata.push(data.data.dishes[key])
        }
        for (let key in data.data.stations) {
          vm.stationlabels.push(key);
          vm.stationdata.push(data.data.stations[key])
        }
        for (let key in data.data.actions) {
          vm.actionlabels.push(key);
          vm.actiondata.push(data.data.actions[key])
        }

        vm.actionFilters=vm.actionlabels.slice();
        vm.actionFilters.unshift('Any');

        vm.dishFilters=vm.dishlabels.slice();
        vm.dishFilters.unshift('Any');

        vm.stationFilters=vm.stationlabels.slice();
        vm.stationFilters.unshift('Any');


      }, function (error) {
        $log.error('Error', error);
      });
    }
    getData();
  }
})();
