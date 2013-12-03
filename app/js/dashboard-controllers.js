/* Controllers */

angular.module('dashboard.controllers', ['ngResource'])
	.controller('FilterController', function($scope, $resource) {

		$scope.countries = [
			                   {name: "Europe",
								selected: true, 
			                 	items: [
				                    {name: "England", selected: true}, 
			                       	{name: "Spain", selected: true},
									{name: "Germany", selected: true},
			                     	{name: "Poland", selected: true},
									{name: "Portugal", selected: false},
			                     	{name: "Austria", selected: false},
									{name: "Russia", selected: false}]},
									
								{name: "Asia",
								 selected: false,
				                 items: [
									{name: "China", selected: false},
									{name: "Japan", selected: false},
									{name: "India", selected: false},
									{name: "Philipines", selected: false},
									{name: "Vietnam", selected: false}]
								}
			];
			
			$scope.divisions = [
			                    {name: "Power Products",
			                    	selected: false, 
			                    	items: [
			                    	        {name: "Wiring Accessories", selected: false}, 
			                    	        {name: "Low Voltage", selected: false},
			                    	        {name: "Transformers", selected: false}
			                    	 ]
			                    },
			                    {name: "Low Voltage Products",
			                    	selected: false, 
			                    	items: [
			                    	        {name: "High Voltage", selected: false}, 
			                    	        {name: "Medium Voltage", selected: false},
			                    	        {name: "Transformers", selected: false}
			                    	        ]
			                    },
		              	        {name: "Process Automation",
		           	        	selected: false,
		           	        	items: [
		        	        	        {name: "Control Technologies", selected: false},
		        	        	        {name: "Full Service", selected: false},
		        	        	        {name: "Industry Solutions", selected: false},
		        	        	        {name: "Marine and Cranes", selected: false},
		        	        	        {name: "Measurement Products", selected: false},
		        	        	        {name: "Service", selected: false},
		        	        	        {name: "Turbocharging", selected: false}
		        	        	        ]
		               	        }
		    ];
			
			$scope.cardTypes = [
			                    {name: "Green card", selected: false},
			                    {name: "Red card", selected: false}
			                    ];
			
			$scope.categories = [
			                    {name: "Ability to manage complexity", selected: false},
			                    {name: "Complete and timely quotes", selected: false},
			                    {name: "Ease of doing business", selected: false},
			                    {name: "Engineering / design capability", selected: false},
			                    {name: "Environment, Health and Safety", selected: false},
			                    {name: "Industry and application knowledge", selected: false},
			                    {name: "Issue resolution", selected: false},
			                    {name: "Lead time", selected: false},
			                    {name: "Commissioning support", selected: false}
			                    ];
			
			  $scope.allSelected = [];
			
			  $scope.selected = undefined;
			  
			  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
			  
			  $scope.locations2 = [
			                      {name: 'Alabama', selected: false}, 
			                      {name: 'Alaska', selected: false}, 
			                      {name: 'Arizona', selected: false}, 
			                      {name: 'Arkansas', selected: false}, 
			                      {name: 'California', selected: false}, 
			                      {name: 'Colorado', selected: false}, 
			                      {name: 'Connecticut', selected: false}, 
			                      {name: 'Delaware', selected: false}, 
			                      {name: 'Florida', selected: false}, 
			                      {name: 'Georgia', selected: false}, 
			                      {name: 'Hawaii', selected: false}, 
			                      {name: 'Idaho', selected: false}, 
			                      {name: 'Illinois', selected: false}, 
			                      {name: 'Indiana', selected: false}, 
			                      {name: 'Iowa', selected: false}, 
			                      {name: 'Kansas', selected: false}, 
			                      {name: 'Kentucky', selected: false}, 
			                      {name: 'Louisiana', selected: false}, 
			                      {name: 'Maine', selected: false}, 
			                      {name: 'Maryland', selected: false}, 
			                      {name: 'Massachusetts', selected: false}, 
			                      {name: 'Michigan', selected: false}, 
			                      {name: 'Minnesota', selected: false}, 
			                      {name: 'Mississippi', selected: false}, 
			                      {name: 'Missouri', selected: false}, 
			                      {name: 'Montana', selected: false}, 
			                      {name: 'Nebraska', selected: false}, 
			                      {name: 'Nevada', selected: false}, 
			                      {name: 'New Hampshire', selected: false}, 
			                      {name: 'New Jersey', selected: false}, 
			                      {name: 'New Mexico', selected: false}, 
			                      {name: 'New York', selected: false}, 
			                      {name: 'North Dakota', selected: false}, 
			                      {name: 'North Carolina', selected: false}, 
			                      {name: 'Ohio', selected: false}, 
			                      {name: 'Oklahoma', selected: false}, 
			                      {name: 'Oregon', selected: false}, 
			                      {name: 'Pennsylvania', selected: false}, 
			                      {name: 'Rhode Island', selected: false}, 
			                      {name: 'South Carolina', selected: false}, 
			                      {name: 'South Dakota', selected: false}, 
			                      {name: 'Tennessee', selected: false}, 
			                      {name: 'Texas', selected: false}, 
			                      {name: 'Utah', selected: false}, 
			                      {name: 'Vermont', selected: false}, 
			                      {name: 'Virginia', selected: false}, 
			                      {name: 'Washington', selected: false}, 
			                      {name: 'West Virginia', selected: false}, 
			                      {name: 'Wisconsin', selected: false}, 
			                      {name: 'Wyoming', selected: false} 
			                      ];
			
			  $scope.addOrRemove = function (item) {
				  var index = $scope.allSelected.indexOf(item);
				  
				  if (index >= 0) {
					  $scope.allSelected.splice(index, 1);
				  } else {
					  $scope.allSelected.push(item);
				  }
			  };
			  // wywolanie serwisu przyklad:
			  //$scope.phones = Phone.query();
//			  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//				    $scope.mainImageUrl = phone.images[0];
//			 });
		
	});

