var reportingServiceURL = '/reporting/rest/filter/:filterName';
//var reportingServiceURL = 'http\\://localhost\\:8080/reporting/rest/filter/:filterName';
//var reportingServiceURL = 'http\\://localhost\\:8080/provider/rest/filter/:filterName';
//var reportingServiceURL = 'http\\://plkrk-l-r9rn32n\\:8000/provider/rest/filter/:filterName';

var dashboardServices = angular.module('dashboard.services', [ 'ngResource' ]);

dashboardServices.factory('filterService', [ '$resource', function($resource) {
    return $resource(reportingServiceURL,

        {filterName: '@filterName'},
        {
            get : {
                method : 'GET',
                params : {query : '@query', maxResults : '@maxResults'},
                isArray : false
            },
            getAll : {
                method : 'GET',
                isArray : false
            }
        });
} ]);

dashboardServices.factory('reportService', [ '$resource', function($resource) {
    return $resource(reportingServiceURL,
        {filterName: '@filterName'},
        {
            get : {
                method : 'POST',
                params : {query : '@query', maxResults : '@maxResults'},
                isArray : false
            }
        });
} ]);


