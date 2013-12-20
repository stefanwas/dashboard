var dashboardServices = angular.module('dashboard.services', [ 'ngResource' ]);

dashboardServices.factory('filterService', [ '$resource', function($resource) {
//    return $resource('http\\://localhost\\:8000/provider/rest/filter/:filterName',
    return $resource('http\\://plkrk-l-r9rn32n\\:8000/provider/rest/filter/:filterName',
//    return $resource('http\\://10.3.48.225\\:8080/provider/rest/filter/:filterName',
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



