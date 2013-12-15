/* Controllers */

var dashboardControllers = angular.module('dashboard.controllers', 
		['dashboard.services', 
		 'dashboard.utils', 
		 'dashboard.mockdata']);

dashboardControllers.controller('FilterController', function($scope, Filter, utils, MockData) {

    // static flat filters
    Filter.getAll({filterName: 'JobFunction'}, function (result) {
        $scope.jobFunctions = utils.prepareItemsToDisplay(result.items, true);
    });

    Filter.getAll({filterName: 'AccountType'}, function (result) {
        $scope.accountTypes = utils.prepareItemsToDisplay(result.items, true);
    });

    Filter.getAll({filterName: 'Industry'}, function (result) {
        $scope.industries = utils.prepareItemsToDisplay(result.items, true);
    });

    Filter.getAll({filterName: 'Year'}, function (result) {
        $scope.years = utils.prepareItemsToDisplay(result.items, true);
    });

    Filter.getAll({filterName: 'Category'}, function (result) {
        $scope.categories = utils.prepareItemsToDisplay(result.items, true);
    });


    // static hierarchical filters
    Filter.getAll({filterName: 'GroupOfProductsProduct'}, function (result) {
        $scope.groupOfProducts = utils.prepareGroupsToDisplay(result.groups, true);
    });

    Filter.getAll({filterName: 'RegionCountry'}, function (result) {
        $scope.regionCountries = utils.prepareGroupsToDisplay(result.groups, true);
    });

    Filter.getAll({filterName: 'AbbDivisionBu'}, function (result) {
        $scope.abbDivisionBUs = utils.prepareGroupsToDisplay(result.groups, true);
    });



    // dynamic flat filters
    Filter.getAll({filterName: 'SurveyName'}, function (result) {
        $scope.surveyNames = utils.prepareItemsToDisplay(result.items, false);
    });

    Filter.getAll({filterName: 'AccountManager'}, function (result) {
        $scope.accountManagers = utils.prepareItemsToDisplay(result.items, false);
    });

//    Filter.getAll({filterName: 'City'}, function (result) {
//        $scope.cities = utils.prepareItemsToDisplay(result.items, false);
//    });

    Filter.getAll({filterName: 'LocalBusinessManager'}, function (result) {
        $scope.localBusinessManagers = utils.prepareItemsToDisplay(result.items, false);
    });

    Filter.getAll({filterName: 'SurveyDesigner'}, function (result) {
        $scope.surveyDesigners = utils.prepareItemsToDisplay(result.items, false);
    });

    // dynamic hierarchical filters

    Filter.getAll({filterName: 'CustomerAccount'}, function (result) {
        $scope.customerAccounts = utils.prepareGroupsToDisplay(result.groups, false);
    });


    // test filters
    $scope.states = MockData.getStates();
    $scope.states2 = MockData.getStates();
    $scope.countries1 = MockData.getCountries();
    $scope.countries2 = MockData.getCountries();
    $scope.divisions = MockData.getDivisions();

});

