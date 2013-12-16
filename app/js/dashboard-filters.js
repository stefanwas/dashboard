var dashboardFilters = angular.module('dashboard.filters', ['ngSanitize']);

dashboardFilters.filter('highlightFilter', function () {
//    return function (input, query) {
//        return input.replace(RegExp('('+ query + ')', 'g'), '<span class="super-class">$1</span>');
//    }

    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    return function(matchItem, query) {
        return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="super-class">$&</span>') : matchItem;
    };

});

