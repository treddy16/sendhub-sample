/**
 * Created by reddy on 10/16/14.
 */
angular.module('sendHubServices', [])
    .factory('SendHub', function($http) {
        return {
            getContacts: function() {
                return $http.get('/api/contacts');
            },
            createContact: function(contact) {
                return $http.post('/api/contacts', contact);
            },
            sendMessage: function(message) {
                return $http.post('/api/messages', message);
            },
            showContactDetails: function(contactId) {
                return $http.get('/api/contacts/' + contactId);
            }
        }
    });