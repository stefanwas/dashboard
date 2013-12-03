/* Directives */

angular.module('dashboard.directives', ['ui.bootstrap.typeahead'])
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
	.directive('flatFilter', function () {
	
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
		}
		
	    return {
	        restrict: 'E',
	        scope: {collection: '='},
	        templateUrl: 'tpl/flat-filter.tpl.html',
	        link : link
	    };
	})
	
	.directive('searchFilter', function () {
	    return {
	        restrict: 'E',
	        scope: {collection: '='},
	        templateUrl: 'tpl/search-filter.tpl.html'
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
	
	

