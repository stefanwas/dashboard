angular.module('dashboard.utils', [])
.factory('utils', function() {
	return {
		isInside : function(event, elem) {
			var domElement = event.target;
			
			while (domElement != null) {
				if (domElement == elem) return true;
				domElement = domElement.parentElement;
			}
			
			return false;
		},

		extendWithChecked : function(items, defaultValue) {
            var extendedItems = [];

            if (items != null) {
                for (i=0; i<items.length; i++) {
                    extendedItems.push({'name': items[i], 'selected': defaultValue});
                }
            }

            return extendedItems;
		}
	}
});