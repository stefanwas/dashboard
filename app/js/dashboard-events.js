angular.module('dashboard.events', []).factory('events', function() {

    function isInside(event, elem) {
        var domElement = event.target;
        while (domElement != null) {
            if (domElement == elem || domElement.$$NG_REMOVED) { //TODO refactor & redesign this stuff
                return true;
            } else {
                domElement = domElement.parentElement;
            }
        }
        return false;
    }

    var attachDropdownHandler = function (scope, element, document) {

        scope.isActive = false;

        scope.bindClickHandler = function () {
            document.on('click', null, scope.dismissClickHandler);
        };

        scope.unbindClickHandler = function () {
            document.off('click', null, scope.dismissClickHandler);
        };

        scope.openDropdown = function () {
            scope.isActive = true;
            scope.bindClickHandler();
        };

        scope.closeDropdown = function () {
            scope.isActive = false;
            scope.unbindClickHandler();
        };

        scope.dismissClickHandler = function (event) {
            if (!isInside(event, element[0])) {
                scope.closeDropdown();
                scope.$apply();
            }
        };
    }

    return {
        attachDropdownHandler : attachDropdownHandler
    }
});