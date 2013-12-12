/* Controllers */

var dashboardControllers = angular.module('dashboard.controllers', ['dashboard.services', 'dashboard.utils', 'dashboard.mockdata']);

dashboardControllers.controller('FilterController', function($scope, Filter, utils, MockData) {

    // static flat filters
    Filter.getAll({filterName: 'JobFunction'}, function (result) {
        $scope.jobFunctions = utils.prepareItemsToDisplay(result.filter.items, true);
    });

    Filter.getAll({filterName: 'AccountType'}, function (result) {
        $scope.accountTypes = utils.prepareItemsToDisplay(result.filter.items, true);
    });

    Filter.getAll({filterName: 'Industry'}, function (result) {
        $scope.industries = utils.prepareItemsToDisplay(result.filter.items, true);
    });

    Filter.getAll({filterName: 'Year'}, function (result) {
        $scope.years = utils.prepareItemsToDisplay(result.filter.items, true);
    });


    // static hierarchical filters
    Filter.getAll({filterName: 'GroupOfProductsProduct'}, function (result) {
        $scope.groupOfProducts = utils.prepareGroupsToDisplay(result.xFilter.groups, true);
    });



    // dynamic flat filters
    Filter.getAll({filterName: 'SurveyName'}, function (result) {
        $scope.states = utils.prepareItemsToDisplay(result.filter.items, false);
    });

    Filter.getAll({filterName: 'AccountManager'}, function (result) {
        $scope.accountManagers = utils.prepareItemsToDisplay(result.filter.items, false);
    });

//    Filter.getAll({filterName: 'City'}, function (result) {
//        $scope.cities = utils.prepareItemsToDisplay(result.filter.items, false);
//    });

    // dynamic hierarchical filters




    // test filters
    $scope.countries1 = MockData.getCountries();
    $scope.countries2 = MockData.getCountries();
    $scope.divisions = MockData.getDivisions();


});

