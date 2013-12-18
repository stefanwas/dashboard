angular.module('dashboard.utils', [])
.factory('utils', function() {

    var prepareItemsToDisplay = function (itemNames, defaultValue) {
        var itemsToDisplay = [];
        if (itemNames != null) {
            angular.forEach(itemNames, function (itemName) {
                itemsToDisplay.push({
                    'name': itemName,
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
                        name: group.name,
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

	return {
		isInside : function(event, elem) {
			var domElement = event.target;
			while (domElement != null) {
				if (domElement == elem || domElement.$$NG_REMOVED) { //TODO refactor & redesing this
					return true;
				} else {
					domElement = domElement.parentElement;
				}
			}
			return false;
		},

        prepareItemsToDisplay : prepareItemsToDisplay,
        prepareGroupsToDisplay : prepareGroupsToDisplay
	}
});