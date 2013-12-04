/* Directives */

angular.module('dashboard.directives', ['dashboard.utils'])
	.directive('hierarchicalFilter', function () {
	
		function link(scope, element, attrs) {
			
			scope.changeMasterSelection = function(selection) {
				angular.forEach(scope.collection, function(group, index) {
					group.selected = selection;
					scope.changeGroupSelection(group);
				});
			};
	
			scope.changeGroupSelection = function(group) {
				angular.forEach(group.items, function(item, index) {
					item.selected = group.selected;
				});
			};
			
			scope.$watch('collection', function () {
				angular.forEach(scope.collection, function(group, index) {
					if (!group.selected) {
						scope.master = false;
					};
					angular.forEach(group.items, function(item, index) {
						if (!item.selected) {
							group.selected = false;
							scope.master = false;
						}
					});
				});
			}, true);		
		}
		
	    return {
	        restrict: 'E',
	        scope: {collection: '='},
	        templateUrl: 'tpl/hierarchical-filter.tpl.html',
	        link : link
	    };
	})
	
	.directive('flatFilter', ['$document', 'utils', function($document, utils) {
	
		function link(scope, element, attrs) {
			
			scope.changeMasterSelection = function(selection) {
				angular.forEach(scope.collection, function(item) {
					item.selected = selection;
				});
			};
	
			scope.$watch('collection', function () {
				angular.forEach(scope.collection, function(item) {
					if (!item.selected) {
						scope.master = false;
						return;
					};
				});
			}, true);		
			
//			isInside =  function(event, elem) {
//				var e = event.target;
//				
//				while (e != null) {
//					if (e == elem) return true;
//					e = e.parentElement;
//				}
//				
//				return false;
//			}
			
			dismissClickHandler = function (event) {
				if (!utils.isInsidex(event, element[0])) {
					scope.showDropdown = false;
					scope.unbindClickHandler(element[0]);
					scope.$apply();
				}
			};
			
			scope.bindClickHandler = function () {
				$document.on('click', dismissClickHandler);		
			}
			
			scope.unbindClickHandler = function (element) {
//				$document.off('click', dismissClickHandler);
			}

			scope.bindClickHandler();
		}
		
	    return {
	        restrict: 'E',
	        scope: {collection: '='},
	        templateUrl: 'tpl/flat-filter.tpl.html',
	        link : link
	    };
	}])
	
	.directive('dynamicFlatFilter', function () {
		
		function link(scope, element, attrs) {
			
			scope.selectedItems = [];
			
			scope.addOrRemove = function (item) {
				var index = scope.selectedItems.indexOf(item);
				
				if (index >= 0) {
					scope.selectedItems.splice(index, 1);
				} else {
					scope.selectedItems.push(item);
				}
			};
		}
		
	    return {
	        restrict: 'E',
	        scope: {collection: '='},
	        templateUrl: 'tpl/dynamic-flat-filter.tpl.html',
	        link : link
	    };		
	})

	
	.directive('autoComplete', function($timeout) {
		return function(scope, element, attrs) {
			element.autocomplete({
				source : scope[attrs.uiItems],
				select : function() {
					$timeout(function() {
						element.trigger('input');
					}, 0);
				}
			});
		};
	});
	
	

