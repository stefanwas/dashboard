/* Directives */

angular.module('dashboard.directives', ['dashboard.utils', 'dashboard.services'])

    .directive('flatFilter', ['$document', 'utils', function($document, utils) {
        function link(scope, element, attrs) {

            scope.initPlaceholder = function () {
                if (scope.master) {
                    scope.placeholder = 'all selected';
                } else {
                    for (var i=0; i<scope.collection.length; i++) {
                        if (scope.collection[i].selected) {
                            scope.placeholder = 'some selected';
                            return;
                        }
                    }
                    scope.placeholder = 'none selected';
                }
            };

            scope.changeMasterSelection = function(selection) {
                angular.forEach(scope.collection, function(item) { item.selected = selection; });
            };

            scope.changeItemSelection = function(item) {
                if (!item.selected) { scope.master = false; }
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

            scope.initPlaceholder();
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
			
			scope.changeMasterSelection = function(selection) {
				angular.forEach(scope.collection, function(group) {
					group.selected = selection;
					scope.changeGroupSelection(group);
				});
			};
	
			scope.changeGroupSelection = function(group) {
                if (!group.selected) {
                    scope.master = false;
                }
				angular.forEach(group.items, function(item) {
					item.selected = group.selected;
				});
			};

            scope.changeItemSelection = function(item) {
                if (!item.selected) {
                    item.groupRef.selected = false;
                    scope.master = false;
                }
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
			
			scope.addOrRemove = function (item) {
				var index = findItemIndex(item);
				
				if (index >= 0) {
					scope.selectedItems.splice(index, 1);
				} else {
					scope.selectedItems.push(item);
				}
			};

            scope.initPlaceholder = function () {
                if (scope.selectedItems.length == 0) {
                    scope.placeholder = 'unspecified';
                } else if (scope.selectedItems.length == 1) {
                    scope.placeholder = '1 item selected';
                } else {
                    scope.placeholder = scope.selectedItems.length + ' items selected';
                }
            };

            scope.$watch('collection', function () {scope.initPlaceholder();}, true);

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
            scope.initPlaceholder();
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
            }

            scope.removeGroup = function (group) {
                var index = findGroupIndex(group, scope.selectedGroups);
                if (index >= 0) {
                    scope.selectedGroups.splice(index, 1);
                }
            }

            scope.addItem = function (item) {
                scope.selectedGroups.push(item.groupRef);
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
	

	
	

