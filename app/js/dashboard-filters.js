var dashboardFilters = angular.module('dashboard.filters', ['dashboard.utils', 'ngSanitize']);

dashboardFilters.filter('highlightMatcher', function (utils) {
    return function(input, query) {
        return query ? input.replace(new RegExp(utils.escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : input;
    };
});

dashboardFilters.filter('hierarchyGroupFilter', function (utils) {

    function hasItemMatch(items, regExp) {
        if (items != null) {
            for (var i=0; i<items.length; i++) {
                if (items[i].name.match(regExp)) return true;
            }
        }
        return false;
    }

    return function (groups, query) {

        if (!query) {return groups;}

        var result = [];
        var regExp = new RegExp(utils.escapeRegexp(query), 'i');
        angular.forEach(groups, function (group) {
            if (group.name.match(regExp) || hasItemMatch(group.items, regExp)) {
                result.push(group);
            }
        });
        return result;
    }
});

dashboardFilters.filter('hierarchyItemFilter', function (utils) {

    return function (items, query) {

        if (!query) {return items;}

        var result = [];
        var regExp = new RegExp(utils.escapeRegexp(query), 'i');

        angular.forEach(items, function (item) {
            if (item.name.match(regExp) || (item.groupRef && item.groupRef.name.match(regExp))) {
                result.push(item);
            }
        });
        return result;
    }

});
