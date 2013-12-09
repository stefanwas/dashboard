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
//                params : {},
                isArray : false
            }

        });
} ]);


//dashboardServices.service('filterContentService', ['$resource', function($resource) {
//    var filterDataProvider = 'http\\://localhost\\:8000/provider/rest/json/filterData';
//
//    this.getFlatFilterContent = function(filterName) {
//        ///////////////////////////////////
//        var filterDataService = $resource(filterDataProvider);
//        var flatFilterMapResult = undefined;
//
//        filterDataService.get(function(result) {
//
////    		$scope.flatFilters = result.filterData.flatFilters;
////    		$scope.hierarchicalFilters = result.filterData.hierarchicalFilters;
//            var flatFilters = result.filterData.flatFilters;
////    		var hierarchicalFilters = result.filterData.hierarchicalFilters;
//
//            var flatFiltersMap = {};
//            for (var i=0; i < flatFilters.length; i++) {
//                var filter = flatFilters[i];
//                flatFiltersMap[filter.name] = filter.items;
//            }
//            flatFilterMapResult = flatFiltersMap;
//
//
//            console.log('This was the result 1:', result.filterData.flatFilters);
//            console.log('This was the result 2:', result.filterData.hierarchicalFilters);
//
//        });
//
//        ///////////////////////////////
//        return "";
//    };
//}
//]);




