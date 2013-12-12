/* Directives */

angular.module('dashboard.directives', ['dashboard.utils', 'dashboard.services'])
	.directive('hierarchicalFilter', ['$document', 'utils', function($document, utils) {
	
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
					}
					angular.forEach(group.items, function(item, index) {
						if (!item.selected) {
							group.selected = false;
							scope.master = false; // fix it
						}
					});
				});
			}, true);	
			
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
	
	.directive('flatFilter', ['$document', 'utils', function($document, utils) {
	
		function link(scope, element, attrs) {

            scope.initPlaceholder = function () {
                if (scope.master) {
                    scope.placeholder = 'Type to filter...         (All Selected)';
                } else {
                    for (var i=0; i<scope.collection.length; i++) {
                        if (scope.collection[i].selected) {
                            scope.placeholder = 'Type to filter...   (Some Selected)';
                            return;
                        }
                    }
                    scope.placeholder = 'Type to filter...    (None Selected)';
                }
            };

			scope.changeMasterSelection = function(selection) {
				angular.forEach(scope.collection, function(item) {
					item.selected = selection;
				});
			};
	
			scope.$watch('collection', function () {

				angular.forEach(scope.collection, function(item) {
					if (!item.selected) {
						scope.master = false; // fix it
					}
				});
                scope.initPlaceholder();
			}, true);		
			
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
	        scope: {collection: '='},
	        templateUrl: 'tpl/flat-filter.tpl.html',
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
                    item.visibilityClass = 'visible';
				} else {
					scope.selectedItems.push(item);
                    item.visibilityClass = 'hidden';
				}
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
                for (var i=0; i<items.length; i++) {
                    if (findItemIndex(items[i]) >= 0) {
                        items[i].selected = true;
                    }
                }
            }

            function hideSelectedItems(items) {
                for (var i=0; i<items.length; i++) {
                    if (items[i].selected) {
                        items[i].visibilityClass = 'hidden';
                    }
                }
            }

            scope.retrieveItems = function (filterName, query) { //to rewrite (when moving items from left to right)
                Filter.get({filterName: filterName, query: scope.filteringText}, function (result) { //TODO !!!
                    scope.collection = utils.extendWithChecked(result.filter.items, false);
                    markSelectedItems(scope.collection);
                    hideSelectedItems(scope.collection);
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
	        templateUrl: 'tpl/dynamic-flat-filter.tpl.html',
	        link : link
	    };		
	}])

    .directive('dynamicHierarchicalFilter', ['$document', 'utils', 'Filter', function($document, utils, Filter) {

        function link(scope, element, attrs) {

            scope.selectedGroups = [];

            scope.addOrRemove = function (group, item) {
                if (item != null) {
                    addOrRemoveItem(group, item);
                } else {
                    addOrRemoveGroup(group);
                }
            }

            function addOrRemoveItem (group, item) {
                var selectedGroup = findSelectedGroup(group.name);

                if (selectedGroup == null) {
                    var newGroup = {name: group.name, selected: false, items: [item]};
                    addGroup(newGroup);
                } else {
                    var selectedItem = findSelectedItem(selectedGroup, item.name);
                    if (selectedItem == null) {
                        addItemToGroup(selectedGroup, item);
                    } else {
                        removeItemFromGroup(selectedGroup, item);
                        if (selectedGroup.items.length == 0) removeGroup(selectedGroup);
                    }
                }
            }

            function addOrRemoveGroup (group) {
                var selectedGroup = findSelectedGroup(group.name);

                if (selectedGroup != null) {
                    removeGroup(group)
                    if (!selectedGroup.selected) {
                        var newItems = [].concat(group.items);
                        var newGroup = {name: group.name, selected: true, items: newItems};
                        addGroup(newGroup);
                    }
                } else {
                    var newItems = [].concat(group.items);
                    var newGroup = {name: group.name, selected: true, items: newItems};
                    addGroup(newGroup);
                }
            };

            function addGroup(group) {
                scope.selectedGroups.push(group);
            }

            function removeGroup(group) {
                for (var i=0; i<scope.selectedGroups.length; i++) {
                    var selectedGroup = scope.selectedGroups[i];
                    if (selectedGroup.name == group.name) {
                        scope.selectedGroups.splice(i, 1);
                        return;
                    }
                }
            }

            function addItemToGroup(group, item) {
                group.items.push(item);
            }

            function removeItemFromGroup(group, item) {
                for (var i=0; i<group.items.length; i++) {
                    var selectedItem = group.items[i];
                    if (selectedItem.name == item.name) {
                        group.items.splice(i, 1);
                        group.selected = false;
                        return;
                    }
                }
            }

            function findSelectedGroup (groupName) {
                for (var i=0; i<scope.selectedGroups.length; i++) {
                    var group = scope.selectedGroups[i];
                    if (group.name == groupName) return group;
                }
                return null;
            }

            function findSelectedItem (group, itemName) {
                for (var i=0; i<group.items.length; i++) {
                    var item = group.items[i];
                    if (item.name == itemName) return item;
                }
                return null;
            }

            // group selection
            scope.changeGroupSelection = function(group) {
                angular.forEach(group.items, function(item, index) {
                    item.selected = group.selected;
                });
            };

            scope.$watch('collection', function () {
                angular.forEach(scope.collection, function(group, index) {
                    angular.forEach(group.items, function(item, index) {
                        if (!item.selected) {
                            group.selected = false; // fix it
                        }
                    });
                });
            }, true);


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

//            function markSelectedItems(items) {
//                for (i=0; i<items.length; i++) {
//                    if (scope.selectedItemNames.indexOf(items[i].name) >= 0) {
//                        items[i].selected = true;
//                    }
//                }
//            }

//            scope.retrieveItems = function (query) {
//                Filter.get({filterName: 'states', query: scope.filteringText}, function (result) {
//                    scope.collection = utils.extendWithChecked(result.filter.items, false);
//                    markSelectedItems(scope.collection);
//                    console.log('>>> collection size=' + scope.collection.length);
//                });
//            }
        }

        return {
            restrict: 'E',
            scope: {collection: '='},
            templateUrl: 'tpl/dynamic-hierarchical-filter.tpl.html',
            link : link
        };
    }])
	
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
	
	

