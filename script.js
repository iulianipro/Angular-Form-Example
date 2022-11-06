// create angular app with module name "validationApp"
var app = angular.module('validationApp', []);

// create angular controller with "mainController" as controller name
// $scope and CalcService are dependent modules.
app.controller('mainController', function($scope, CalcService) {
  
    /*$scope.books is the model which are to be used in the HTML page.*/
    /*We can define functions as well in $scope.*/
    //Method for Angular service for number square
    $scope.square = function() {
        $scope.result = CalcService.square($scope.number);
    }
});

//Custom Directive for pattern check
app.directive('allowPattern', [allowPatternDirective]);

function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function(tElement, tAttrs) {
            return function(scope, element, attrs) {
                // I handle key events
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

                    // If the keyCode char does not match the allowed Regex Pattern,
                    //then don't allow the input into the field.
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                        event.preventDefault();
                        return false;
                    }

                });
            };
        }
    };
}

// Angularjs Services
app.factory('MathService', function() {
    var factory = {};
    factory.multiply = function(a, b) {
        return a * b
    }
    return factory;
});

//Service to multiply the given number
app.service('CalcService', function(MathService) {
    this.square = function(a) {
        return MathService.multiply(a, a);
    }
});
