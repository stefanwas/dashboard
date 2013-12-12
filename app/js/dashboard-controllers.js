/* Controllers */

var dashboardControllers = angular.module('dashboard.controllers', ['dashboard.services', 'dashboard.utils', 'dashboard.mockdata']);

dashboardControllers.controller('FilterController', function($scope, Filter, utils, MockData) {

//    Filter.getAll({filterName: 'cardTypes'}, function (result) {
//        $scope.cardTypes = utils.extendWithChecked(result.filter.items, true);
//    });
//
//    Filter.getAll({filterName: 'categories'}, function (result) {
//        $scope.categories = utils.extendWithChecked(result.filter.items, true);
//    });

    Filter.getAll({filterName: 'SurveyName'}, function (result) {
        $scope.states = utils.extendWithChecked(result.filter.items, false);
    });

    Filter.getAll({filterName: 'AccountManager'}, function (result) {
        $scope.accountManagers = utils.extendWithChecked(result.filter.items, false);
    });

    $scope.surveyNameFilter = 'SurveyName';

    $scope.countries1 = MockData.getCountries();
    $scope.countries2 = MockData.getCountries();
    $scope.divisions = MockData.getDivisions();
});

