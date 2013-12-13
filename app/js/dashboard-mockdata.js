var dashboardMockdata = angular.module('dashboard.mockdata', []);

dashboardMockdata.factory('MockData', function () {
    return {
        getStates : function() {
            var states = [
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

            return states;
        },

        getCountries : function () {
            return [
                {name: "Europe",
                    selected: false,
                    items: [
                        {name: "England", selected: false},
                        {name: "Spain", selected: false},
                        {name: "Germany", selected: false},
                        {name: "Poland", selected: false},
                        {name: "Portugal", selected: false},
                        {name: "Austria", selected: false},
                        {name: "Russia", selected: false}]},

                {name: "Asia",
                    selected: false,
                    items: [
                        {name: "China", selected: false},
                        {name: "Japan", selected: false},
                        {name: "India", selected: false},
                        {name: "Philippines", selected: false},
                        {name: "Vietnam", selected: false}]
                },
                {name: "Africa",
                    selected: false,
                    items: [
                        {name: "Egypt", selected: false},
                        {name: "Libya", selected: false},
                        {name: "Tunisia", selected: false},
                        {name: "Algeria", selected: false},
                        {name: "Niger", selected: false},
                        {name: "Mali", selected: false},
                        {name: "Chad", selected: false},
                        {name: "Nigeria", selected: false},
                        {name: "Morocco", selected: false}]
                },
                {name: "Australia",
                    selected: false,
                    items: [
                        {name: "Australia", selected: false},
                        {name: "New Zealand", selected: false}]
                }
            ];
        },


        getDivisions : function () {
            return [
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
        }
    }
});

