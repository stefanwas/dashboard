var dashboardFilters = angular.module('dashboard.filters', ['ngSanitize']);

dashboardFilters.filter('simpleFilter', function () {
    return function (input, query) {
    	return input.replace(RegExp('('+ query + ')', 'g'), '<span class="super-class">$1</span>');
//        return input + '!!';
    }
});

