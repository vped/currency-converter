(function(){

    'use strict';

    angular
        .module('fxApp.exchangeRates')
        .controller("CurrencyConverterCtrl", CurrencyConverterCtrl);

    // Explicitly injecting required services, so the controller keep on running even after the code obfuscation.
    CurrencyConverterCtrl.$inject = ['$scope', 'CurrencyConverterService','chartService'];

    chartService.renderChart();// for rendering empty chart

    function CurrencyConverterCtrl($scope, CurrencyConverterService,chartService){

        var defaults = {
            fromList : {},
            toList : {},
            from : "USD",
            to : "",
            amount : 1.0,
            referenceRate: 0
        };
        $scope.ui = {
            converting: false
        };
        $scope.currencyForm = angular.copy(defaults);
        $scope.onConvert = convert;
        $scope.onReset = reset;
        $scope.onCurrencyChange = currencyChanged;

        // get list of all available currencies
        CurrencyConverterService.getSupportedCurrencies().then(function (data) {
            $scope.currencyForm.fromList = angular.copy(data);
            $scope.currencyForm.toList = angular.copy(data);
        });

        function convert (from, to) {
            $scope.ui.converting = true;
            CurrencyConverterService.getReferenceRate(from, to).then(function (data) {
                $scope.currencyForm.referenceRate = data;
                chartService.updateChart({label:to,rate:data}) // passing object to chartService update chart method
                $scope.ui.converting = false;
            });
        }

        function reset(){
            // $scope.currencyForm.from = $scope.currencyForm.to = "";commented as requirement was to always get base currency from USD
            $scope.currencyForm.to = "";
            $scope.currencyForm.amount = 1.0;
            $scope.currencyForm.referenceRate = 0;
            chartService.resetChart(); // to reset chart data 
        }

        function currencyChanged() {
            $scope.currencyForm.referenceRate = 0;
        }

    }
})();
