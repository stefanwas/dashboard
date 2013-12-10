var dashboardServices = angular.module('dashboard.services', [ 'ngResource' ]);

dashboardServices.factory('Filter', [ '$resource', function($resource) {
    return $resource('http\\://localhost\\:8000/provider/rest/filter/:filterName',
        {filterName: '@filterName'},
        {
            get : {
                method : 'GET',
                params : {
                    query : '@query'
                },
                isArray : false
            },
            getAll : {
                method : 'GET',
                isArray : false
            }

        });
} ]);



