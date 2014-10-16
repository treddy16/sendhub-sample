/**
 * Created by reddy on 10/16/14.
 */
var sendHubControllers = angular.module('sendHubControllers', []);

sendHubControllers.controller('ContactListCtrl',
    function ($scope, $http, $location, $rootScope, SendHub) {
        $scope.loaded = false;
        $scope.newContact = function () {
            $location.path("/contacts/new");
        }

        $scope.showDetails = function (contactId) {
            $location.path("/contacts/" + contactId);
        }

        $scope.sendMessage = function (contactId) {
            $location.path("/messages/send/" + contactId);
        }

        SendHub.getContacts().success(function (data) {
            $scope.contacts = data.objects;
            $rootScope.contacts = data.objects;
            $scope.loaded = true;
        });
    }
);

sendHubControllers.controller('NewContactCtrl',
    function ($scope, $http, $location, SendHub) {
        $scope.contact = {};
        $scope.contact.name = "";
        $scope.contact.number = "";
        $scope.submitted = false;
        $scope.creating = false;
        $scope.contactCreated = false;

        $scope.contact.createNew = function (isValid) {
            $scope.creating = true;
            var contact = {
                name: $scope.contact.name,
                number: $scope.contact.number
            };

            if (isValid) {
                SendHub.createContact(contact).success(function (data) {
                    $scope.creating = false;
                    $scope.contactCreated = true;

                    $location.path("/contacts/" + data.id);
                });
            }
        }
    }

);

sendHubControllers.controller('SendMessageCtrl',
    function ($scope, $rootScope, $http, $location, $routeParams, SendHub) {
        $scope.message = {};
        $scope.message.contactid = $routeParams.contactId;
        $scope.message.text = "";
        $scope.message.contactname = "";
        $scope.message.contactnumber = "";
        $scope.sending = false;


        angular.forEach($rootScope.contacts, function (contact, index) {
            if (contact.id == $routeParams.contactId) {
                $scope.message.contactname = contact.name;
                $scope.message.contactnumber = contact.number;
            }
        });

        $scope.submitted = false;
        $scope.messageSent = false;

        $scope.message.send = function (isValid) {
            $scope.submitted = true;

            if (isValid) {
                var message = {
                    contactid: $scope.message.contactid,
                    text: $scope.message.text
                };

                $scope.sending = true;

                SendHub.sendMessage(message).success(function (data) {
                    $scope.sending = false;
                    $scope.messageSent = true;
                });
            }
        }
    }

);

sendHubControllers.controller('ContactDetailCtrl',
    function ($scope, $http, $location, $filter, $routeParams, SendHub) {
        $scope.loaded = false;
        $scope.contact = {};
        $scope.contact.name = "";
        $scope.contact.number = "";
        $scope.contact.created = "";
        $scope.contact.modified = "";
        $scope.contact.screened = false;

        $scope.contactId = $routeParams.contactId;

        $scope.sendMessage = function (contactId) {
            $location.path("/messages/send/" + contactId);
        }

        SendHub.showContactDetails( $scope.contactId).success(function (data) {
            $scope.contact.name = data.name;
            $scope.contact.number = data.number;
            $scope.contact.created = $filter('date')(data.date_created, "medium");
            $scope.contact.modified = $filter('date')(data.date_modified, "medium");
            $scope.contact.screened = data.screened ? "Yes" : "No";

            $scope.loaded = true;
        });
    }
);