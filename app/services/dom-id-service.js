/*global $, jQuery, document, io, angular*/

var domIdModule = angular.module('dom-id-service', []);

domIdModule.factory('domId', function ($rootScope) {
    "use strict";
    //local variables
    
    var domId,
        makeId = function () {
            var text = "",
                possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                i;
            for (i = 0; i < 5; i += 1) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
    return {
        genDomId: makeId
    };
    //Method of generating id
    //method for assinging ids to a map
    //method for retrieving ids from map
});