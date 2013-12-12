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
                    groupsToDisplay.push({
                        name: group.name,
                        selected: defaultValue,
                        visible: true,
                        items: prepareItemsToDisplay(group.items)
                    });
                });
            }
            return groupsToDisplay;
        }

	return {
		isInside : function(event, elem) {
			var domElement = event.target;
			while (domElement != null) {
				if (domElement == elem) return true;
				domElement = domElement.parentElement;
			}
			return false;
		},

//		extendWithChecked : function(items, defaultValue) {
//            var extendedItems = [];
//
//            if (items != null) {
//                for (i=0; i<items.length; i++) {
//                    extendedItems.push({'name': items[i], 'selected': defaultValue, 'visibilityClass': 'visible'});
//                }
//            }
//
//            return extendedItems;
//		},

        prepareItemsToDisplay : prepareItemsToDisplay,
        prepareGroupsToDisplay : prepareGroupsToDisplay
	}
});