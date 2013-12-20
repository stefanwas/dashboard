/* Controllers */

var dashboardControllers = angular.module('dashboard.controllers', ['dashboard.services',  'dashboard.utils']);

dashboardControllers.controller('FilterController', function($scope, filterService, utils) {

    // static flat filters
    filterService.getAll({filterName: 'JobFunction'}, function (result) {
        $scope.jobFunctions = utils.prepareItemsToDisplay(result.items, true);
    });

    filterService.getAll({filterName: 'AccountType'}, function (result) {
        $scope.accountTypes = utils.prepareItemsToDisplay(result.items, true);
    });

    filterService.getAll({filterName: 'Industry'}, function (result) {
        $scope.industries = utils.prepareItemsToDisplay(result.items, true);
    });

    filterService.getAll({filterName: 'Year'}, function (result) {
        $scope.years = utils.prepareItemsToDisplay(result.items, true);
    });

    filterService.getAll({filterName: 'Category'}, function (result) {
        $scope.categories = utils.prepareItemsToDisplay(result.items, true);
    });


    // static hierarchical filters
    filterService.getAll({filterName: 'GroupOfProductsProduct'}, function (result) {
        $scope.groupOfProducts = utils.prepareGroupsToDisplay(result.groups, true);
    });

    filterService.getAll({filterName: 'RegionCountry'}, function (result) {
        $scope.regionCountries = utils.prepareGroupsToDisplay(result.groups, true);
    });

    filterService.getAll({filterName: 'AbbDivisionBu'}, function (result) {
        $scope.abbDivisionBUs = utils.prepareGroupsToDisplay(result.groups, true);
    });



    // dynamic flat filters
    filterService.getAll({filterName: 'SurveyName'}, function (result) {
        $scope.surveyNames = utils.prepareItemsToDisplay(result.items, false);
    });

    filterService.getAll({filterName: 'AccountManager'}, function (result) {
        $scope.accountManagers = utils.prepareItemsToDisplay(result.items, false);
    });

//    Filter.getAll({filterName: 'City'}, function (result) {
//        $scope.cities = utils.prepareItemsToDisplay(result.items, false);
//    });

    filterService.getAll({filterName: 'LocalBusinessManager'}, function (result) {
        $scope.localBusinessManagers = utils.prepareItemsToDisplay(result.items, false);
    });

    filterService.getAll({filterName: 'SurveyDesigner'}, function (result) {
        $scope.surveyDesigners = utils.prepareItemsToDisplay(result.items, false);
    });

    // dynamic hierarchical filters

    filterService.getAll({filterName: 'CustomerAccount'}, function (result) {
        $scope.customerAccounts = utils.prepareGroupsToDisplay(result.groups, false);
    });


    // test filters
//    $scope.states = MockData.getStates();
//    $scope.states2 = MockData.getStates();
//    $scope.countries1 = MockData.getCountries();
//    $scope.countries2 = MockData.getCountries();
//    $scope.divisions = MockData.getDivisions();

});

