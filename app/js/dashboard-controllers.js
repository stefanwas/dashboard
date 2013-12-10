/* Controllers */

var dashboardControllers = angular.module('dashboard.controllers', ['dashboard.services', 'dashboard.utils', 'dashboard.mockdata']);

dashboardControllers.controller('FilterController', function($scope, Filter, utils, MockData) {

    Filter.getAll({filterName: 'cardTypes'}, function (result) {
        $scope.cardTypes = utils.extendWithChecked(result.filter.items, true);
    });

    Filter.getAll({filterName: 'categories'}, function (result) {
        $scope.categories = utils.extendWithChecked(result.filter.items, true);
    });

    Filter.getAll({filterName: 'states'}, function (result) {
        $scope.states = utils.extendWithChecked(result.filter.items, false);
    });

    $scope.countries = MockData.getCountries();
    $scope.divisions = MockData.getDivisions();
});

