/**
 * This service uses chart.js to render chart and update chart values as per api responses.
 */

(function () {

    angular
        .module('fxApp.exchangeRates')
        .factory("chartService", chartService);

    // Explicitly injecting required services, so the service keep on running even after the code obfuscation.
    chartService.$inject = ['_'];

    function chartService(_) {


        return {

                chartData : {
                    labels: [],
                    datasets: [
                        {
                            label: "Currency Rates",
                            fillColor: "#0BDBDB",
                            strokeColor: "#0BDBDBF",
                            highlightFill: "#0097A7",
                            highlightStroke: "#00897B",
                            data: []
                        }
                    ]
                },

                options : {
                    barShowStroke : true,   
                    barStrokeWidth : 2,
                    scaleBeginAtZero : true,
                    scaleShowVerticalLines: false,
                    animation: true,

                    // Number - Number of animation steps
                    animationSteps: 45,
                    animationEasing: "easeInOutQuad"
                },
                /**
                * This service renders chart 
                */
             renderChart : function(data){
                if(this.myBarChart !== undefined){
                this.myBarChart.destroy();// for animating bar from 0 to their values , clearing previous chart instance
                }
                var ctx = document.getElementById("currencyBarChart").getContext("2d");
                this.myBarChart = new Chart(ctx).Bar(this.chartData,this.options);
             },

             updateChart : function(data) {
                var repeatedCurrencyIndex=_.indexOf(this.chartData.labels,data.label);
                if(repeatedCurrencyIndex !== -1){
                    this.chartData.datasets[0].data.splice(repeatedCurrencyIndex,1,data.rate);
                }
                else{
                this.chartData.labels.push(data.label);
                this.chartData.datasets[0].data.push(data.rate);
                }
                this.renderChart();
             },

             resetChart : function () {// for resetting chart data to empty graph plot
               if(this.myBarChart !== undefined){
                this.myBarChart.destroy();//clear chart data if any
                this.chartData.labels = []; // clear currency labels
                this.chartData.datasets[0].data = [] ; // clear corresponding rates
                // this.renderChart();// for rendering empty chart on reset click
                }
             }
        }
    }

})();