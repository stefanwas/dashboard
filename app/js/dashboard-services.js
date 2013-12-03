var dashboardServices = angular.module('dashboard.services', [ 'ngResource' ]);

dashboardServices.factory('Filter', [ '$resource', function($resource) {
	return $resource('filter/:filterName.json', {}, {
		query : {
			method : 'GET',
			params : {
				filterName : 'filters'
			},
			isArray : true
		}
	});
} ]);