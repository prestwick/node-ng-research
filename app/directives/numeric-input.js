/*global $, jQuery, document, io, angular*/

angular.module('numeric-input-directive', [])
    .directive('lvNumericinput', function ($rootScope, socket) {
        "use strict";
        return {
            link: function ($scope, $element, attributes) {
                $rootScope.domIdRegistry[attributes.id] = $element;
                $element.jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true});
            }
        };
    });