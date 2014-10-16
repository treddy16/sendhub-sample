/**
 * Created by reddy on 10/15/14.
 */
var express = require('express');
var app = express();
var client = require('node-rest-client').Client;
var bodyParser = require('body-parser');
var restClient = new client()

var sendHubUrl = "https://api.sendhub.com/v1";
var sendHubUser = "512-553-8372";
var sendHubApiKey = "fdd96e0503fae85ff8a7f4e3d1a82d69bc67a714";

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/api/contacts', function(req, res) {
    var url = sendHubUrl + "/contacts/?username=" + sendHubUser + "&api_key=" + sendHubApiKey;
    console.log("GET: " + url);

    restClient.get(url, function(data, response) {
       res.contentType('application/json');
       res.send(data);
    });
});

app.get('/api/contacts/:contactId', function(req, res) {
    var contactId = req.param('contactId');

    var url = sendHubUrl + "/contacts/" + contactId + "/?username=" + sendHubUser + "&api_key=" + sendHubApiKey;
    console.log("GET: " + url);

    restClient.get(url, function(data, response) {
        res.contentType('application/json');
        res.send(data);
    });
});

app.post('/api/contacts', function(req, res) {
    var args = {
        data: {
            name: req.body.name,
            number: req.body.number
        },
        headers: {"Content-Type": "application/json"}
    }

    var url = sendHubUrl + "/contacts/?username=" + sendHubUser + "&api_key=" + sendHubApiKey;
    console.log("POST: " + url);
    restClient.post(url, args, function(data, response) {
        res.contentType('application/json');
        res.send(data);
    });
});

app.post('/api/messages', function(req, res) {
    var args = {
        data: {
            contacts: [req.body.contactid],
            text: req.body.text
        },
        headers: {"Content-Type": "application/json"}
    }

    var url = sendHubUrl + "/messages/?username=" + sendHubUser + "&api_key=" + sendHubApiKey;
    console.log("POST: " + url);
    restClient.post(url, args, function(data, response) {
        res.contentType('application/json');
        res.send(data);
    });
});

var server = app.listen(9000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Sample SendHub app listening at http://%s:%s', host, port)

});