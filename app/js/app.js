/**
 * Created by reddy on 10/16/14.
 */
var sendHubApp = angular.module('sendHubApp', [
    'ngRoute',
    'sendHubControllers',
    'sendHubServices'
]);

sendHubApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/contacts', {
                templateUrl: 'partials/contacts-list.html',
                controller: 'ContactListCtrl'
            }).
            when('/contacts/new', {
                templateUrl: 'partials/new-contact.html',
                controller: 'NewContactCtrl'
            }).
            when('/contacts/:contactId', {
                templateUrl: 'partials/contact-details.html',
                controller: 'ContactDetailCtrl'
            }).
            when('/messages/send/:contactId', {
                templateUrl: 'partials/send-message.html',
                controller: 'SendMessageCtrl'
            }).
            otherwise({
                redirectTo: '/contacts'
            });
    }]);