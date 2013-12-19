/* Directives */

angular.module('dashboard.directives', ['dashboard.utils', 'dashboard.services'])

    .directive('flatFilter', ['$document', 'utils', function($document, utils) {
        function link(scope, element, attrs) {

            scope.updatePlaceholder = function () {
                scope.placeholder = utils.getStaticPlaceholder(scope.master, scope.collection, 'item');
            }

            scope.changeMasterSelection = function(selection) {
                angular.forEach(scope.collection, function(item) { item.selected = selection; });
                scope.updatePlaceholder();
            };

            scope.changeItemSelection = function(item) {
                if (!item.selected) { scope.master = false; }
                scope.updatePlaceholder();
            }

            scope.isActive = false;

            scope.openDropdown = function () {
                scope.isActive = true;
                scope.bindClickHandler();
            };

            scope.closeDropdown = function () {
                scope.isActive = false;
                scope.unbindClickHandler();
            };

            scope.dismissClickHandler = function (event) {
                if (!utils.isInside(event, element[0])) {
                    scope.closeDropdown();
                    scope.$apply();
                }
            };

            scope.bindClickHandler = function () {
                $document.on('click', null, scope.dismissClickHandler);
            };

            scope.unbindClickHandler = function () {
                $document.off('click', null, scope.dismissClickHandler);
            };

            scope.updatePlaceholder();
        }

        return {
            restrict: 'E',
            scope: {
                collection: '=',
                filterName: '@'
            },
            templateUrl: 'tpl/flat-filter.tpl.html',
            link : link
        };
    }])

	.directive('hierarchicalFilter', ['$document', 'utils', function($document, utils) {
		function link(scope, element, attrs) {

            scope.updatePlaceholder = function () {
                scope.placeholder = utils.getStaticPlaceholder(scope.master, scope.collection, 'group');
            }
			
			scope.changeMasterSelection = function(selection) {
				angular.forEach(scope.collection, function(group) {
					group.selected = selection;
					scope.changeGroupSelection(group);
				});
                scope.updatePlaceholder();
			};
	
			scope.changeGroupSelection = function(group) {
                if (!group.selected) {
                    scope.master = false;
                }
				angular.forEach(group.items, function(item) {
					item.selected = group.selected;
				});
                scope.updatePlaceholder();
			};

            scope.changeItemSelection = function(item) {
                if (!item.selected) {
                    item.groupRef.selected = false;
                    scope.master = false;
                }
                scope.updatePlaceholder();
            }

            scope.expandAll = function (query) {
                var expand = query != "";
                angular.forEach(scope.collection, function(group) { group.expand = expand; });
            }

			scope.isActive = false;
			
			scope.openDropdown = function () {
				scope.isActive = true;
				scope.bindClickHandler();
			};
			
			scope.closeDropdown = function () {
				scope.isActive = false;
				scope.unbindClickHandler();
			};
			
			scope.dismissClickHandler = function (event) {
				if (!utils.isInside(event, element[0])) {
					scope.closeDropdown();
					scope.$apply();
				}
			};
			
			scope.bindClickHandler = function (handler) {
				$document.on('click', null, scope.dismissClickHandler);	
			};
			
			scope.unbindClickHandler = function () {
				$document.off('click', null, scope.dismissClickHandler);
			}

            scope.updatePlaceholder();
		}
		
	    return {
	        restrict: 'E',
	        scope: {collection: '='},
	        templateUrl: 'tpl/hierarchical-filter.tpl.html',
	        link : link
	    };
	}])

	.directive('dynamicFlatFilter', ['$document', 'utils', 'Filter', function($document, utils, Filter) {
		
		function link(scope, element, attrs) {

			scope.selectedItems = [];

            scope.updatePlaceholder = function () {
                scope.placeholder = utils.getDynamicPlaceholder(scope.selectedItems, 'item');
            }
			
			scope.addOrRemove = function (item) {
				var index = findItemIndex(item);
				
				if (index >= 0) {
					scope.selectedItems.splice(index, 1);
				} else {
					scope.selectedItems.push(item);
				}
                scope.updatePlaceholder();
			};

            scope.isActive = false;
			
			scope.openDropdown = function () {
				scope.isActive = true;
				scope.bindClickHandler();
			};
			
			scope.closeDropdown = function () {
				scope.isActive = false;
				scope.unbindClickHandler();
			};
			
			scope.dismissClickHandler = function (event) {
				if (!utils.isInside(event, element[0])) {
					scope.closeDropdown();
					scope.$apply();
				}
			};
			
			scope.bindClickHandler = function () {
				$document.on('click', null, scope.dismissClickHandler);	
			};
			
			scope.unbindClickHandler = function () {
				$document.off('click', null, scope.dismissClickHandler);
			};

            function findItemIndex(item) {
                for (var i=0; i<scope.selectedItems.length; i++) {
                    if (scope.selectedItems[i].name == item.name) return i;
                }
                return -1;
            }

            function markSelectedItems(items) {
                angular.forEach(items, function (item){
                    if (findItemIndex(item) >= 0) {
                        item.selected = true;
                    }
                });
            }

            scope.retrieveItems = function (filterName, query) {
                Filter.get({filterName: filterName, query:query}, function (result) {
                    scope.collection = utils.prepareItemsToDisplay(result.items, false);
                    markSelectedItems(scope.collection);
                    console.log('>>> collection size=' + scope.collection.length);
                });
            }

            scope.updatePlaceholder();
		}
		
	    return {
	        restrict: 'E',
	        scope: {
                collection: '=',
                filterName: '@'
            },
	        templateUrl: 'tpl/dynamic-flat-filter.tpl.html',
	        link : link
	    };		
	}])

    .directive('dynamicHierarchicalFilter', ['$document', 'utils', 'Filter', function($document, utils, Filter) {

        function link(scope, element, attrs) {

            scope.selectedGroups = [];

            scope.updatePlaceholder = function () {
                scope.placeholder = utils.getDynamicPlaceholder(scope.selectedGroups, 'group');
            }

            function findItemIndex(item, items) {
                for (var i=0; i<items.length; i++) {
                    if (items[i].name == item.name) {
                        return i;
                    }
                }
                return -1;
            }

            function findGroupIndex(group, groups) {
                for (var i=0; i<groups.length; i++) {
                    if (groups[i].name == group.name) {
                        return i;
                    }
                }
                return -1;
            }

            scope.addGroup = function (group) {
                scope.selectedGroups.push(group);
                scope.updatePlaceholder();
            }

            scope.removeGroup = function (group) {
                var index = findGroupIndex(group, scope.selectedGroups);
                if (index >= 0) {
                    scope.selectedGroups.splice(index, 1);
                }
                scope.updatePlaceholder();
            }

            scope.addItem = function (item) {
                scope.selectedGroups.push(item.groupRef);
                scope.updatePlaceholder();
            }

            scope.removeItem = function (item) {
                var numberOfSelectedItems = 0;
                angular.forEach(item.groupRef.items, function (item) {
                   if (item.selected) {
                       numberOfSelectedItems++;
                   }
                });
                if (numberOfSelectedItems == 0) {
                    scope.removeGroup(item.groupRef);
                }
                scope.updatePlaceholder();
            }

            scope.changeGroupSelection = function(group) {
                angular.forEach(group.items, function(item) {
                    item.selected = group.selected;
                });
            };

            scope.changeItemSelection = function(item) {
                if (!item.selected) {
                    item.groupRef.selected = false;
                }
            }

            // hide & show dropdown
            scope.isActive = false;

            scope.openDropdown = function () {
                scope.isActive = true;
                scope.bindClickHandler();
            };

            scope.closeDropdown = function () {
                scope.isActive = false;
                scope.unbindClickHandler();
            };

            scope.dismissClickHandler = function (event) {
                if (!utils.isInside(event, element[0])) {
                    scope.closeDropdown();
                    scope.$apply();
                }
            };

            scope.bindClickHandler = function () {
                $document.on('click', null, scope.dismissClickHandler);
            };

            scope.unbindClickHandler = function () {
                $document.off('click', null, scope.dismissClickHandler);
            };

            //////
            function markSelectedGroups(groups) {
                angular.forEach(groups, function (group) {
                    var selectedGroupIdx = findGroupIndex(group, groups);
                    if (selectedGroupIdx >= 0) {
                        group.selected = scope.selectedGroups[selectedGroupIdx].selected;
                        angular.forEach(group.items, function (item) {
                            if (findItemIndex(item, scope.selectedGroups[selectedGroupIdx].items) >= 0) {
                                item.selected = true;
                            }
                        })
                    }
                })
            }

            scope.retrieveItems = function (filterName, query) {
                Filter.get({filterName: filterName, query: query}, function (result) {
                    scope.collection = utils.prepareGroupsToDisplay(result.groups, false);
                    markSelectedGroups(scope.collection);
                    console.log('>>> collection size=' + scope.collection.length);
                });
            }

            scope.updatePlaceholder();
        }

        return {
            restrict: 'E',
            scope: {
                collection: '=',
                filterName: '@'
            },
            templateUrl: 'tpl/dynamic-hierarchical-filter.tpl.html',
            link : link
        };
    }]);
	

	
	

