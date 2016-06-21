'use strict';

var Fluxxor = require('fluxxor');
var CONSTANTS = require('../constants/constants');

var SpotterAPI = require('../lib/spotter');

var ClientStore = Fluxxor.createStore({
    initialize: function(params) {
        this.state = {
            clients: []
        };
        /*
        this.state = {
            clients: [
                {
                    name: 'Robert Daly',
                    fname: 'Robert',
                    lname: 'Daly',
                    id: 1,
                    trainer: 'Zeus',
                    avatar: 'rob',
                    email: 'robert@gmail.com'
                },
                {
                    name: 'Jan Konieczny',
                    fname: 'Jan',
                    lname: 'Konieczny',
                    id: 173829,
                    trainer: 'Zeus',
                    avatar: 'jan',
                    email: 'jan@hotmail.com'
                },
                {
                    name: 'Julia Stent',
                    fname: 'Julia',
                    lname: 'Stent',
                    id: 3,
                    trainer: 'Zeus',
                    avatar: 'julia',
                    email: 'julia@gmail.com'
                },
                {
                    name: 'Arnold Schwarzenegger',
                    fname: 'Arnold',
                    lname: 'Schwarzenegger',
                    id: 173830,
                    trainer: 'Zeus',
                    avatar: 'arnold',
                    email: 'arnold@yahoo.com'
                }
            ]
        };
        */

        this.bindActions(
            CONSTANTS.CLIENT.ADD,               this.clientsAdd,
            CONSTANTS.CLIENT.IMAGE.ADD,         this.clientImageAdd,
            CONSTANTS.CLIENT.IMAGE.UPLOADED,    this.clientImageUploaded,
            CONSTANTS.CLIENT.SET,               this.clientsSet,
            CONSTANTS.CLIENTS.GET,              this.clientsGet
        );
    },
    getState: function(){
        return this.state;
    },
    clientsAdd: function(payload) {
        console.log('clientsAdd', payload);
        payload.client.name = payload.client.name || payload.client.fname + ' ' + payload.client.lname;

        SpotterAPI.addClient(payload.client, function(data) {
            console.log('clientsAdd data', data);
            this.state.lastAdded = data;
            this.flux.actions.clients.get();

            this.emit('change:clientAdded');
            this.emit('change');
        }.bind(this));
    },
    clientsGet: function() {
        console.log('clientsGet');

        SpotterAPI.getClients(function(data) {
            console.log('GOT CLIENTS', data);
            if (data.total && data.total > 0) {
                this.state.clients = data.data;
            }
            this.emit('change:clientsGot');
            this.emit('change');
        }.bind(this));

        this.emit('change');
    },
    clientsSet: function(payload) {
        console.log('clientsSet', payload);
        var name = payload.client.name.split(' ');
        payload.client.fname = name.shift();
        payload.client.lname = name;

        this.state.client = payload.client;

        this.emit('change');
    },
    clientImageAdd: function(payload) {
        console.log('clientImageAdd', payload);

        SpotterAPI.xhrImage(payload.id, payload.file, function(data) {
            this.flux.actions.client.image.uploaded({
                id:     payload.id,
                url:    data.url
            });
        }.bind(this));
    },
    clientImageUploaded: function(payload) {
        this.state.clients.map(function(client) {
            if (payload.id === client.id) {
                client.picture = payload.url;
            }
        });

        this.emit('change:clientImageUploaded');
        this.emit('change');
        console.log(payload, this.state);
    }
});

module.exports = ClientStore;
