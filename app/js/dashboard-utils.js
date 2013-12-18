angular.module('dashboard.utils', [])
.factory('utils', function() {

    var nonHtmlCharacterMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    var escapeHtml = function escapeHtml(string) {
        return string.replace(/[&<>"'\/]/g, function (character) {return nonHtmlCharacterMap[character];});
    }

    var escapeRegexp = function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    var prepareItemsToDisplay = function (itemNames, defaultValue) {
        var itemsToDisplay = [];
        if (itemNames != null) {
            angular.forEach(itemNames, function (itemName) {
                itemsToDisplay.push({
                    'name': escapeHtml(itemName),
                    'selected': defaultValue,
                    'visible': true
                });
            });
        }
        return itemsToDisplay;
    };

    var prepareGroupsToDisplay = function (groups, defaultValue) {
            var groupsToDisplay = [];
            if (groups != null) {
                angular.forEach(groups, function (group) {

                    var preparedGroup = {
                        name: escapeHtml(group.name),
                        selected: defaultValue,
                        expand: false,
                        visible: true
                    };

                    var preparedItems = prepareItemsToDisplay(group.items, defaultValue);

                    preparedGroup.items = preparedItems;
                    angular.forEach(preparedItems, function (item) { item.groupRef = preparedGroup; });
                    groupsToDisplay.push(preparedGroup);
                });
            }
            return groupsToDisplay;
        }

    var isInside = function(event, elem) {
        var domElement = event.target;
        while (domElement != null) {
            if (domElement == elem || domElement.$$NG_REMOVED) { //TODO refactor & redesing this
                return true;
            } else {
                domElement = domElement.parentElement;
            }
        }
        return false;
    }

	return {
		isInside : isInside,
        escapeHtml : escapeHtml,
        escapeRegexp : escapeRegexp,
        prepareItemsToDisplay : prepareItemsToDisplay,
        prepareGroupsToDisplay : prepareGroupsToDisplay
	}
});