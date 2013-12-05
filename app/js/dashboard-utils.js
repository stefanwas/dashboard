angular.module('dashboard.utils', [])
.factory('utils', function() {
	return {
		isInside : function(event, elem) {
			var e = event.target;
			
			while (e != null) {
				if (e == elem) return true;
				e = e.parentElement;
			}
			
			return false;
		}
	
//	,

//		doSomethingElse : function() {
//			// Do something else here
//		}
	}
});