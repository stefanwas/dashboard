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

    function getNoOfSelectedItems(items) {
        var numberOfSelectedItems = 0;

        angular.forEach(items, function (item) { if (item.selected) numberOfSelectedItems++; });

        return numberOfSelectedItems;
    }

    function getNoOfSelectedGroupItems(groups) {
        var numberOfSelectedItems = 0;

        angular.forEach(groups, function (group) {
            if (group.items) {
                numberOfSelectedItems += getNoOfSelectedItems(group.items);
            }
        });

        return numberOfSelectedItems;
    }

    function getNoOfSelectedElements(elements, elementType) {
        if (elementType == 'group') {
            return getNoOfSelectedGroupItems(elements);
        }
        if (elementType == 'item') {
            return getNoOfSelectedItems(elements);
        }
        return 0;
    }

    var getStaticPlaceholder = function getStaticPlaceholder(masterSelected, elements, elementType) {
        var noneSelected = 'none selected';
        var allSelected = 'all selected';
        var someSelected = ' items selected';

        var numberOfItemsSelected = 0;
        if (elements != null) {
            numberOfItemsSelected = getNoOfSelectedElements(elements, elementType);
        }

        if (masterSelected) {
            return allSelected;
        }
        if (numberOfItemsSelected > 0) {
            return numberOfItemsSelected + someSelected;
        }

        return noneSelected;
    }

    var getDynamicPlaceholder = function getDynamicPlaceholder(elements, elementType) {
        var noneSelected = 'unspecified';
        var someSelected = ' items selected';

        var numberOfItemsSelected = getNoOfSelectedElements(elements, elementType);

        if (numberOfItemsSelected > 0) {
            return numberOfItemsSelected + someSelected;
        }

        return noneSelected;
    }

//
//            scope.initPlaceholder = function () {
//                if (scope.selectedItems.length == 0) {
//                    scope.placeholder = 'unspecified';
//                } else if (scope.selectedItems.length == 1) {
//                    scope.placeholder = '1 item selected';
//                } else {
//                    scope.placeholder = scope.selectedItems.length + ' items selected';
//                }
//            };

	return {
		isInside : isInside,
        escapeHtml : escapeHtml,
        escapeRegexp : escapeRegexp,
        prepareItemsToDisplay : prepareItemsToDisplay,
        prepareGroupsToDisplay : prepareGroupsToDisplay,
        getStaticPlaceholder : getStaticPlaceholder,
        getDynamicPlaceholder : getDynamicPlaceholder
	}
});