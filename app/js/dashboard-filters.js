var dashboardFilters = angular.module('dashboard.filters', ['ngSanitize']);

dashboardFilters.filter('highlightMatcher', function () {
    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    return function(matchItem, query) {
        return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : matchItem;
    };
});

dashboardFilters.filter('hierarchyGroupFilter', function () {

    function hasItemMatch(items, regExp) {
        if (items != null) {
            for (var i=0; i<items.length; i++) {
                if (items[i].name.match(regExp)) return true;
            }
        }
        return false;
    }

    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    return function (groups, query) {

        if (!query) {return groups;}

        var result = [];
        var regExp = new RegExp(escapeRegexp(query), 'i');
        angular.forEach(groups, function (group) {
            if (group.name.match(regExp) || hasItemMatch(group.items, regExp)) {
                result.push(group);
            }
        });
        return result;
    }
});


dashboardFilters.filter('hierarchyItemFilter', function () {

    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    return function (items, query) {

        if (!query) {return items;}

        var result = [];
        var regExp = new RegExp(escapeRegexp(query), 'i');

        angular.forEach(items, function (item) {
            if (item.name.match(regExp) || (item.groupRef && item.groupRef.name.match(regExp))) {
                result.push(item);
                return;
            }
        });
        return result;
    }

});
